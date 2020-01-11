// gatsby-node.js
const fs = require("fs"); // native
const zlib = require("zlib"); // native
const path = require("path"); // native
const glob = require("glob"); // https://www.npmjs.com/package/glob
const { GraphQLString } = require("graphql");

const { parse } = require("./src/data/parse.js");

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
          }
        }
      }

      goodreadsShelf {
        id
        shelfName
        reviews {
          reviewID
          rating
          votes
          spoilerFlag
          dateAdded
          dateUpdated
          body
          book {
            bookID
            isbn
            isbn13
            textReviewsCount
            uri
            link
            title
            titleWithoutSeries
            imageUrl
            smallImageUrl
            largeImageUrl
            description
          }
        }
      }
    }
  `);

  // Create blog posts pages.
  const entries = parse(query);
  entries.forEach(({ component, ...rest }) => {
    createPage({
      path: rest.url,
      component: component,
      context: rest
    });
  });
};

exports.onPostBuild = pages => {
  const publicPath = path.join(__dirname, "public");
  const gzippable = glob.sync(
    `${publicPath}/**/?(*.html|*.js|*.css|*.ico|*.pdf)`
  );
  gzippable.forEach(file => {
    if (!fs.lstatSync(file).isFile()) {
      return;
    }

    const content = fs.readFileSync(file);
    const zipped = zlib.gzipSync(content);
    fs.writeFileSync(`${file}.gz`, zipped);
  });
};
