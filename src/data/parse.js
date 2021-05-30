const path = require("path"); // native

exports.parse = query => {
  const post = path.resolve("src/templates/post.js");
  const review = path.resolve("src/templates/review.js");

  const posts = parseMarkdown(query.data.allMarkdownRemark.edges, post);
  const reviews = parseGoodreads(query.data.goodreadsShelf.reviews, review);

  let entries = posts.concat(reviews);
  entries.sort((a, b) => {
    return Date.parse(b.date) - Date.parse(a.date);
  });
  entries = entries.map((e, index) => ({
    ...e,
    next: index === 0 ? entries[entries.length - 1] : entries[index - 1],
    prev: index === entries.length - 1 ? entries[0] : entries[index + 1]
  }));

  return entries;
};

// parse each markdown blog post
const parseMarkdown = (posts, component) =>
  posts.map(({ node }) => ({
    url: getURL(node.frontmatter.title),
    component: component,
    title: node.frontmatter.title,
    body: node.html,
    date: node.frontmatter.date,
    excerpt: node.excerpt
  }));

// parse each goodreads review
const parseGoodreads = (reviews, component) => {
  let outReviews = [];

  reviews.forEach(r => {
    let body = r.body.replace(/\\n/g, "").trim();
    if (!body) {
      return;
    }

    const ps = body
      .split("<br /><br />")
      .join("</p><p>")
      .split("<br>")
      .filter(p => p)
      .join("</p><p>");
    let excerpt =
      body
        .replace(/<[^>]*>?/gm, "")
        .split(" ")
        .slice(0, 50)
        .join(" ") + "…";
    body = `<p>${ps}</p>`;

    const title = r.book.title.split(":")[0];

    // dates are returned like this:
    // "Sat Jan 25 14:19:54 -0800 2020"
    const dateS = r.dateAdded.split(" ");

    const monthMap = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11
    };

    // year, month, day
    const year = parseInt(dateS[5]);
    const month = monthMap[dateS[1]];
    const day = parseInt(dateS[2]);
    const date = new Date(year, month, day);

    outReviews.push({
      url: getURL(r.book.title),
      component: component,
      title: title,
      body: body,
      date: date,
      excerpt: excerpt,
      rating: r.rating,
      link: r.book.link
    });
  });

  const exclude = [
    "/blog/the-color-of-law-a-forgotten-history-of-how-our-government-segregated-america",
    "/blog/team-human",
    "/blog/the-reactionary-mind-conservatism-from-edmund-burke-to-sarah-palin",
    "/blog/how-to-change-your-mind-what-the-new-science-of-psychedelics-teaches-us-about-consciousness-dying-addiction-depression-and-transcendence"
  ];
  outReviews = outReviews.filter(r => !exclude.includes(r.url));

  return outReviews;
};

const getURL = title => {
  let slug = title
    .toLowerCase()
    .split(" ")
    .map(c => c.replace(/\W/g, ""))
    .join("-");
  slug = encodeURI(slug); // uri encode

  return `/blog/${slug}`; // add date if names start to conflict
};
