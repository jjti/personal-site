// gatsby-node.js
const fs = require("fs"); // native
const zlib = require("zlib"); // native
const path = require("path"); // native
const glob = require("glob"); // https://www.npmjs.com/package/glob

/**
 * Build pages.
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Using async await. Query will likely be very similar to your pageQuery in index.js
  const query = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              date
              title
            }
            html
            excerpt(pruneLength: 300)
          }
        }
      }

      allGoodreadsLibraryExportCsv {
        edges {
          node {
            Title
            Date_Added
            My_Review
            My_Rating
          }
        }
      }
    }
  `);

  const nodes = createBlogNodes(query);

  // Create home page
  createPage({
    path: "/",
    component: path.resolve("src/templates/index.js"),
    context: { nodes },
  });

  // Create blog home page
  createPage({
    path: "/blog/",
    component: path.resolve("src/templates/blog.js"),
    context: { nodes },
  });

  // Create publications page
  createPage({
    path: "/publications/",
    component: path.resolve("src/templates/publications.js"),
  });

  // Create 404 page
  createPage({
    path: "/404/",
    component: path.resolve("src/templates/404.js"),
  });

  // Create markdown blog and book review posts
  nodes.forEach(({ component, ...rest }) => {
    createPage({
      path: rest.url,
      component: component,
      context: rest,
    });
  });
};

/**
 * Create all blog and review posts. Sort by create date.
 */
const createBlogNodes = (query) => {
  const posts = parseBlog(query.data.allMarkdownRemark.edges);
  const reviews = parseReviews(query.data.allGoodreadsLibraryExportCsv.edges);

  let nodes = posts.concat(reviews);
  nodes.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  nodes = nodes.map((e, index) => ({
    ...e,
    next: index === 0 ? nodes[nodes.length - 1] : nodes[index - 1],
    prev: index === nodes.length - 1 ? nodes[0] : nodes[index + 1],
  }));
  return nodes;
};

/**
 * Parse markdown reviews.
 */
const parseBlog = (posts) =>
  posts.map(({ node }) => ({
    url: getURL(node.frontmatter.title),
    component: path.resolve("src/templates/post.js"),
    title: node.frontmatter.title,
    body: node.html,
    date: node.frontmatter.date,
    excerpt: node.excerpt,
  }));

/**
 * Parse the CSV of goodread reviews
 */
const parseReviews = (reviews) => {
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
      component: path.resolve("src/templates/review.js"),
      title: title,
      body: body,
      date: date,
      excerpt: excerpt,
      rating: r.My_Rating,
    });
  });

  const exclude = [
    "the-color-of-law",
    "team-human",
    "the-reactionary-mind",
    "how-to-change-your-mind",
    "meditations",
    "antifragile",
    "the-moral-landscape",
  ];
  outReviews = outReviews.filter(
    (r) => !exclude.find((e) => r.url.includes(e))
  );

  return outReviews;
};

/**
 * Create the URL of a page.
 */
const getURL = (title) => {
  let slug = title
    .toLowerCase()
    .split(" ")
    .map((c) => c.replace(/\W/g, ""))
    .join("-");
  slug = encodeURI(slug); // uri encode

  return `/blog/${slug}`; // add date if names start to conflict
};

/**
 * Gzip files
 */
exports.onPostBuild = (_) => {
  const publicPath = path.join(__dirname, "public");
  const gzippable = glob.sync(
    `${publicPath}/**/?(*.html|*.js|*.css|*.ico|*.pdf)`
  );
  gzippable.forEach((file) => {
    if (!fs.lstatSync(file).isFile()) {
      return;
    }

    const content = fs.readFileSync(file);
    const zipped = zlib.gzipSync(content);
    fs.writeFileSync(`${file}.gz`, zipped);
  });
};
