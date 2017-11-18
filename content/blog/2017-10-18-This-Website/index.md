---
title: This Website
date: 10/18/2017
---

I decided to make this site after starting grad applications. All of them had some field saying something like "Link to personal website (optional)." I did not make this just because of those input fields, but it was the impetus. Other reasons for making it were that 1) [joshuatimmons.com](https://www.joshuatimmons.com/) was available and 2) I like the idea of having a repository for stuff that I work on.

Right now, despite it having a "Blog" section, I'm planning to just use it to post results from my projects. Like a portfolio website for an arts major. In other words,  I don't plan to rant about Trump in my free time.

Repository: [github.com/JJTimmons/personal-site](https://github.com/JJTimmons/personal-site)

### Needs

All I needed was a static website that I could easily add content to. So what I should have done was another Wordpress or Wix site, but I program with React/Node at work and didn't feel like going back to Wordpress with all its PHP hooks (I'm 2 years out of date on Wordpress' tech stack, so they might have moved on by now).

All the pages/routes I was initially planning on having were: Home/About/Contact and Publications/Posters/Talks/Resume. In hindsight, I should have just gone with that.

### React-Create-App

Instead, I forked React-Create-App and started to write. I made two mistakes in making this site and my first was thinking that it might also be cool to have a blog section. That led to wondering how to import markdown into Webpack. Solutions have already been made for this ([markdown-loader](https://www.npmjs.com/package/markdown-loader)), but the pain was associating meta with each post. Then I found out about YAML and frontmatter, solutions for this exact, non-original problem. So I looked at [markdown-with-frontmatter-loader](https://github.com/matthewwithanm/markdown-with-front-matter-loader). That worked well until I tried to embed an image in the post. The image uri wasn't persisting to post-build. In hind-sight there's probably some existing "copy-links" transformer that does this in Webpack, but I decided instead to have each post be a jsx module that exports the meta as fields on the object. The index.js would then load each .jsx subFile and sort on the date field. This worked so I posted it to an S3 bucket.

To me, the most interesting this about the S3 pipeline was using aws-cli for syncing. My sync file is, in its entirety, the following:

```javascript

"use strict";

const child_process = require("child_process");
const path = require("path");
const buildDir = path.resolve("./public");

child_process.exec(
	`aws s3 sync ${buildDir} s3://www.joshuatimmons.com --delete`,
	(error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	}
);
```

### Performance

I wasn't happy about the performance with this solution. It being React, the routes were being rendered client-side with javascript on an empty index.html. Furthermore, none of the images were being optimized and, in a few cases, 3MB images were being sent on every page load. The effects were apparent. I was getting ~40 on the Chrome Lighthouse Performance audit and the initial page loads times were hovering around 5 seconds on what I thought was a pretty light page. Additionally, though technically it worked, it was annoying writing posts in javascript rather than Markdown.

These findings led to my second mistake making this website: Googling "react router static website markdown." One of the first links was for a static website generator called [GatsbyJS](https://www.gatsbyjs.org/), and it read like a wish-list. [Markdown transformers](https://www.npmjs.com/package/gatsby-transformer-remark) were simply plugins, and images could easily be optimized during the build (remark transformer config snippet below). Every route is built into a static html page, and all the Webpack optimizations are handled by the library's developers. The library's creator, [Kyle Mathews](https://github.com/KyleAMathews), called it a "meta-compiler," and it has been exactly what I was looking for. I knew I wanted it to be fast, and I knew I wanted to write the site's content in Markdown, but I didn't want to chase the diminishing returns of the "best" Webpack configuration.

```javascript
{
	resolve: "gatsby-transformer-remark",
	options: {
	plugins: [
		"gatsby-remark-copy-linked-files",
		`gatsby-remark-autolink-headers`,
		{
		resolve: `gatsby-remark-images`,
		options: {
			maxWidth: 590,
			linkImagesToOriginal: false
		}
		},
		{
		resolve: `gatsby-remark-prismjs`,
		options: {
			classPrefix: "language-"
		}
		}
	]
	}
}
```

The library is also "powered by GraphQL," which felt like overkill to me, since my only data-source was going to be these markdown posts and their linked images, but I also use GraphQL at work so it wasn't too much of a turn-off. Finally, the Gatsby allows for use of stateful React Components, which I thought might be interesting (fantasy football draft optimizer or plasmid map viewer, etc).

### Rebuild in GatsbyJS

Moving from React-Create-App (definitely not React-Create-Website in retrospect) was straightforward given the number of guides on setting up a blog with the library. This was a particularly helpful post: [Creating a Blog with Gatsby](https://www.gatsbyjs.org/blog/2017-07-19-creating-a-blog-with-gatsby/). I'm happy to say that I got the main two things I was looking for: posts in markdown with copied/optimized images and better overall performance results from "server-rendered" pages. I'm now hovering around 98 though Google audit. My last steps will be to gzip everything (or get CloudFront to do it) and fix the S3 object cache headers. Finally, given the 20+ hours I've spent making the site, we'll see how many posts I actually create. My guess is 2 more.

### Update on Deploy

Turns out that aws-cli has its shortfalls. For me, it was the inability to invalidate the CloudFront cache post S3 sync. In otherwords, the ability to immediately update the site when I push changes. The solution is relatively straightforward with S3cmd, with the flag "--cf-invalidate," and its Windows equivelant, but I did not want to pay $99 for some Windows software. A closed issue on this feature, or lack thereof, is [here](https://github.com/aws/aws-cli/issues/920). I now invalidate the entire S3 bucket in Cloudfront after a sync using the path "/*". I was concerned about doing it this way until I saw the following on [the AWS blog](https://aws.amazon.com/blogs/aws/simplified-multiple-object-invalidation-for-amazon-cloudfront/):

>An invalidation path that includes the “*” character incurs the same charge as one that does not. You pay for one invalidation path, even if the path matches hundreds or thousands of objects.

With the following, I see changes almost immediately after syncing. Although my deploy pipeline differs significantly, [this is a very useful guide](https://stormpath.com/blog/ultimate-guide-deploying-static-site-aws) for setting up a static website with AWS S3 and Cloudfront.

```javascript
child_process.exec(
	`aws s3 sync ${buildDir} s3://www.joshuatimmons.com --acl public-read --sse --delete --cache-control max-age=604800,public`,
	(error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		} else if (stdout) {
			child_process.exec(
				`aws cloudfront create-invalidation --distribution-id XXXXXXXXXXXXX --paths /*`,
				(errorcf, stdoutcf, stderrcf) => {
					console.log(`error-cf: ${error}`);
					console.log(`stdout-cf: ${stdoutcf}`);
					console.log(`stderr-cf: ${stderrcf}`);
				}
			);
		} else {
			console.log(`stderr: ${stderr}`);
		}
	}
);
```
