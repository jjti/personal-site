---
title: A Serverless Golang House Scraper
date: 5/14/2018
---

I'm looking at houses right now because I started reading [Mr Money Mustache](https://www.mrmoneymustache.com/) and [/r/personalfinance](https://www.reddit.com/r/personalfinance/). I was hooked by their message: an increased savings rate leads to freedom. The goal is allow projects, career moves, and physical moves to all be made on personal rather than financial interests.

The barrier between me and a higher savings rate is housing. It's greater than 60% of my total spending, even with split rent in a small studio. And I'm not alone in the experience -- Boston is the [third most expensive](http://time.com/money/4287132/most-expensive-cities-to-rent/) U.S. city in which to be a renter.

So to reduce my spending, I started looking at houses. Unsurprisingly in a HCOL area, not many houses fit what I'm looking for, and I've wound up scrolling/clicking through hundreds on Zillow. Most shoppers setup a search in MLS, Zillow, or Redfin to be auto-notified when a house hits the market that fits their search criteria. That's probably the best approach, but I decided instead to setup a scraper that polls houses in Boston and ranks them based on their estimated cash flow (expected rent minus expenses). Besides creating a more convenient, real-time ranking, it also meant getting to learn more Golang and play around more with [Serverless](https://serverless.com/): an application framework I've been using at work with great results.

### Serverless Setup

Github repo: [https://github.com/JJTimmons/real-estate-bot](https://github.com/JJTimmons/real-estate-bot)

I decided to build it in two pieces: a scraper and a webpage renderer.

The job of the scraper is to:

1.  Get a list of all houses in the market
2.  Hit [Zillow's API](https://www.zillow.com/howto/api/APIOverview.htm) to get a rent estimate
3.  Estimate all expenses (tax, mortgage, repairs) and then cash flow
4.  Send an email ([AWS SES](https://aws.amazon.com/ses/)) if a new house reaches the top of the rankings

And the job of the webpage renderer is to, on changes to the house ranking, build a webpage at [http://www.houses.joshuatimmons.com/](http://www.houses.joshuatimmons.com/) to show the results visually.

The typical route to accomplishing the above would be to create a single Golang application that runs on a server and re-scrapes and re-builds the webpages every n number of hours. That would've worked fine, but would've meant worrying about and paying for an EC2 instance for the app. And, since I want to serve the website from S3 (for all its benefits), it would mean that the server's only job would be to scrape every x-hours and sit idle during each interim. I.e. there would be a lot of downtime for an app that's only accomplishing something a few time a day.

Serverless is a better solution to this problem. Rather than thinking about the instance that the server runs on, the scraper and renderer and can be split into two cloud functions (Lambda for AWS) and only be executed when needed. Lambda takes care of the deployment, and Serverless makes it easy to develop and push the code to Lambda.

The final directory structure of the app wound up being:

```
|-scrape
| |-house.go // a struct for house info and Zillow API
| |-main.go  // for scraping to get the list of available hosues
|
|-www
| |-main.go        // the webpage rendered
| |-rankings.html  // the house ranking template file
|
-config.go   // config variables
-db.go       // centralized access to the S3 DB
-email.go    // for sending emails on leaderboard updates
```

### S3 as a Database

Since I was already going to use S3 to serve the static rankings, it made sense to also keep the houses "DB" in S3 as well. I opted for [Golang's gob encoding](https://blog.golang.org/gobs-of-data). DB.NewDB() returns a struct with a decoded map of DBHouses that were stored during a prior scrape. The DB struct also has methods for accessing its private slice of houses, setting new houses (encoding a slice of houses and pushing to S3), as well as a method for writing any arbitrary file to S3 (used for pushing the HTML webpages).

The keys of the map are the street addresses and the values are instances of DBHouse.

```go
// DBHouse is a single entry in the S3 database houses slice
// it's a single stored house
type DBHouse struct {
	ZPID         string `json:"ZPID"`
	Address      string `json:"Address"`
	Cost         int    `json:"Cost"`
	Rent         int    `json:"Rent"` // zillow estimate
	BedsAndBaths string `json:"BedsAndBaths"`
	Link         string `json:"Link"`
	Flow         int    `json:"Flow"`    // estimated monthly cash flow
	Emailed      bool   `json:"Emailed"` // has user already been emailed about this house
}

// DB is a root object that gets the table from AWS S3
// and wraps several functions for interacting with it
type DB struct {
	houses map[string]DBHouse
	sess   *session.Session
}

// NewDB returns a copy of the houses in the S3 DB
// houses is populated on instantiation
func NewDB() *DB {
	log.Println("Making a new DB...")

	conf := NewConfig()

    // create an AWS session
	sess := session.Must(session.NewSession(&aws.Config{
        Region: aws.String(endpoints.UsEast1RegionID),
    }))

	svc := s3.New(sess)

	// Make the map to be downloaded/decoded
	var houses map[string]DBHouse

	// Download the S3 object
	results, err := svc.GetObject(&s3.GetObjectInput{
		Bucket: aws.String(conf.S3Bucket),
		Key:    aws.String(s3Houses),
	})

	if err != nil {
		log.Println(err.Error())
		houses = make(map[string]DBHouse)
	} else {
		defer results.Body.Close()
		decoder := gob.NewDecoder(results.Body)
		err = decoder.Decode(&houses)
		if err != nil {
			log.Println(err.Error())
			houses = make(map[string]DBHouse)
		}
	}

	return &DB{houses, sess}
}
```

The actual cost estimation for a house is made with the Estimate method on a DBHouse struct. It tries to guess the total monthly expenses, including taxes, HOA, mortgage, and repairs. The Rent field, already on the DBHouse, is used to estimate the house's Flow.

```go
const (
	mRate      = 0.0455     // current. TODO: poll API
	taxRate    = 0.015 / 12 // avg in MA
	repairRate = 0.015 / 12
	months     = 360.0      // 30 * 15
	hoa        = 150.0      // avg HOA fee: https://www.realtor.com/advice/buy/what-are-hoa-fees/
)

// Estimate mutates the DBHouse to include an estimate of the flow
// amount per month as well as its flip value (both rough estimates)
func (d *DBHouse) Estimate() {
	// do calculation
	// monthyl mortgage rate is:
	// (r * P) / (1 - (1 + r) ^ -N)
	// src:  https://en.wikipedia.org/wiki/Mortgage_calculator#Monthly_payment_formula
	var (
		down     = float64(d.Cost) * 0.8 // assuming 20% down
		mortgage = ((mRate / 12) * down) / (1 - math.Pow(1+(mRate/12), -months))
		repairs  = float64(d.Cost) * repairRate // assuming 1.5%/year
		tax      = float64(d.Cost) * taxRate    // assuming taxes around 1.5%/year
		expense  = int(hoa + mortgage + repairs + tax)
	)

	d.Flow = d.Rent - expense
}
```

### Webpage Rendering

To render the golang pages, I decided to try out Golang's built-in [templating library](https://golang.org/pkg/text/template/). If I was creating a larger application or planned
on more interaction client-side, I could've instead used [GatsbyJS](https://www.gatsbyjs.org/), which I use for this site. It would've meant being able to develop in React, and output static files upload to S3.

There's also the very popular [Hugo](https://gohugo.io/) which has the dual-benefits of 1) also being in Golang, so there would be little context switching in the app, and 2) being extremely performant, so the Lambda function would execute quickly enough to never run into issues with the [5 minute execution limit](https://docs.aws.amazon.com/lambda/latest/dg/limits.html).

```html
<!-- The Golang Template -->
<head>
  <script>
    function openInNewTab(url) {
      var win = window.open(url, '_blank');
      win.focus();
    }
  </script>

  <meta name="google" content="notranslate">
</head>

<body>
  <h1>Real Estate Rankings</h1>
  <table id="houses" cellpadding="0" cellspacing="0" width="100%" border="0">
    <thead>
      <th class="address-header">Address</th>
      <th>Est. Cash Flow</th>
      <th>Rent/Expenses</th>
      <th>Cost</th>
      <th>Beds/Baths</th>
    </thead>
    <tbody>
      {{range .Houses}}
      <tr class="house" onclick="openInNewTab('{{.Link}}');">
        <td class="address">
          {{.Address}}
        </td>
        <td>{{.Flow}}</td>
        <td>{{.Rent}}/{{.Expense}}</td>
        <td>{{.Cost}}</td>
        <td>{{.Bedrooms}}/{{.Bathrooms}}</td>
      </tr>
      {{end}}
    </tbody>
  </table>
</body>
```

And the actual renderer function...

```go
// the renderer

// Response from the lambda function logs whether the scrape was
// successful and how many houses were added to DyanmoDB
type Response struct {
	Message string `json:"message"`
}

func check(e error) {
	if e != nil {
		log.Fatalln(e)
	}
}

type HousesData struct {
	Houses    []bot.DBHouse
}

// WWW compiles html files from the results, syncs to the
// target S3 directory, and starts a static server for development
func WWW() (Response, error) {
	tmpl := template.Must(template.ParseFiles("./www/rankings.html"))

	db := bot.NewDB()
	bosHouses := HousesData{db.Houses(true)} // true here is to filter out the blacklisted houses

	// execute and upload
	var bos bytes.Buffer
	err = tmpl.Execute(&bos, bosHouses)
	check(err)

	// SetFile here accepts a key, for what to name the file in S3,
	// the bytes, and the encoding
	db.SetFile("boston.html", &bos, "text/html; charset=utf-8")

	log.Println("Synced to S3 bucket...")

	return Response{
		Message: "Webpages were updated",
	}, nil
}
```

### Wrapping Up

Using Golang with Serverless was an enjoyable way to build this small app. It meant being able to build small separate microservices with independent roles, each of which can be strongly typed with Golang and, in the case of the scrapers, highly performant (see: concurrent). The app's use case is extremely common: scraping data from the web and compiling the results to a webpage. The approach above in one easy solution. I'd like to try out other webpage renderers, since the Golang tamplating library is limited (compared to GastbyJS and Hugo), but the easy of constructing and deploying the Serverless functions was enjoyable and something I'd replicate in the future for similar tasks.
