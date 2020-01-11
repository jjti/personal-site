const path = require("path"); // native

exports.parse = query => {
  const post = path.resolve("src/templates/post.js");
  const review = path.resolve("src/templates/review.js");

  const posts = parseMarkdown(query.data.allMarkdownRemark.edges, post);
  const reviews = parseGoodreads(query.data.goodreadsShelf.reviews, review);

  let entries = posts.concat(reviews);
  entries.sort((a, b) => {
    const d1 = new Date(a.date).getTime();
    const d2 = new Date(b.date).getTime();
    return d2 - d1;
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
  const outReviews = [];

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

    outReviews.push({
      url: getURL(r.book.title),
      component: component,
      title: title,
      body: body,
      date: r.dateAdded,
      excerpt: excerpt,
      rating: r.rating,
      link: r.book.link
    });
  });

  return outReviews;
};

const getURL = title => {
  let slug = title
    .toLowerCase()
    .split(" ")
    .map(c => c.replace(/\W/g, ""))
    .join("-");
  slug = encodeURI(slug); // uri encode

  return `blog/${slug}`; // add date if names start to conflict
};
