// gatsby-node.js
const fs = require("fs"); // native
const zlib = require("zlib"); // native
const path = require("path"); // native
const glob = require("glob"); // https://www.npmjs.com/package/glob
const { GraphQLString } = require("graphql");

const getURL = node => {
  const slug = node.frontmatter.title
    .toLowerCase()
    .split(" ")
    .join("-");

  return `blog/${node.frontmatter.date}/${slug}`;
};

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  if (type.name !== "MarkdownRemark") {
    return {};
  }

  return Promise.resolve({
    url: {
      type: GraphQLString,
      resolve: node => getURL(node)
    }
  });
};

exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  const postTemplate = path.resolve("./src/templates/post.js");

  // Using async await. Query will likely be very similar to your pageQuery in index.js
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              date
              title
            }
            id
            url
            excerpt(pruneLength: 150)
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.log(result.errors);
    throw new Error("Things broke, see console output above");
  }

  // Create blog posts pages.
  const edges = result.data.allMarkdownRemark.edges;
  edges.sort((a, b) => {
    const d1 = new Date(a.node.frontmatter.date).getTime();
    const d2 = new Date(b.node.frontmatter.date).getTime();
    return d2 - d1;
  });

  edges.forEach(({ node }, index) => {
    createPage({
      path: node.url,
      component: postTemplate,
      context: {
        // Context will be passed in to the page query as graphql vars
        url: node.url,
        prev:
          index === 0 ? edges[edges.length - 1].node : edges[index - 1].node,
        next: index === edges.length - 1 ? edges[0].node : edges[index + 1].node
      }
    });
  });
};

exports.onPostBuild = pages => {
  const publicPath = path.join(__dirname, "public");
  const gzippable = glob.sync(`${publicPath}/**/?(*.html|*.js|*.css|*.ico)`);
  gzippable.forEach(file => {
    const content = fs.readFileSync(file);
    const zipped = zlib.gzipSync(content);
    fs.writeFileSync(`${file}.gz`, zipped);
  });
};
