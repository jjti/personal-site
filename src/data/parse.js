const path = require("path"); // native
const { exit } = require("process");

exports.parse = (query) => {
  const postComponent = path.resolve("src/templates/post.js");
  const reviewComponent = path.resolve("src/templates/review.js");

  const posts = parseMarkdown(
    query.data.allMarkdownRemark.edges,
    postComponent
  );
  const reviews = parseGoodreads(
    query.data.allGoodreadsLibraryExportCsv.edges,
    reviewComponent
  );

  let entries = posts.concat(reviews);
  entries.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  entries = entries.map((e, index) => ({
    ...e,
    next: index === 0 ? entries[entries.length - 1] : entries[index - 1],
    prev: index === entries.length - 1 ? entries[0] : entries[index + 1],
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
    excerpt: node.excerpt,
  }));

// parse each goodreads review
const parseGoodreads = (reviews, component) => {
  let outReviews = [];

  reviews.forEach(({ node: r }) => {
    let body = r.My_Review.replace(/\\n/g, "").trim();
    if (!body) {
      return;
    }

    const excerpt =
      body
        .replace(/<[^>]*>?/gm, "")
        .split(" ")
        .slice(0, 50)
        .join(" ") + "…";
    const ps = body
      .replaceAll("<br/><br/>", "</p><p>")
      .replaceAll("<br /><br />", "</p><p>")
      .replaceAll("<br>", "<p>")
      .replaceAll("<br><br>", "</p><p>");
    body = `<p>${ps}</p>`;

    const title = r.Title.split(":")[0];

    // dates are returned like this:
    // "2021/01/24"
    const [year, month, day] = r.Date_Added.split("/");
    if (!year || !month || !day) {
      console.warn("failed " + r.Title + r.Date_Added);
      return;
    }
    const date = new Date(year, month, day);

    outReviews.push({
      url: getURL(r.Title),
      component: component,
      title: title,
      body: body,
      date: date,
      excerpt: excerpt,
      rating: r.My_Rating,
    });
  });

  const exclude = [
    "/blog/the-color-of-law-a-forgotten-history-of-how-our-government-segregated-america",
    "/blog/team-human",
    "/blog/the-reactionary-mind-conservatism-from-edmund-burke-to-sarah-palin",
    "/blog/how-to-change-your-mind-what-the-new-science-of-psychedelics-teaches-us-about-consciousness-dying-addiction-depression-and-transcendence",
  ];
  outReviews = outReviews.filter((r) => !exclude.includes(r.url));

  return outReviews;
};

const getURL = (title) => {
  let slug = title
    .toLowerCase()
    .split(" ")
    .map((c) => c.replace(/\W/g, ""))
    .join("-");
  slug = encodeURI(slug); // uri encode

  return `/blog/${slug}`; // add date if names start to conflict
};
