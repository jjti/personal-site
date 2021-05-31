import { graphql } from "gatsby";
import React from "react";

import { parse } from "../data/parse.js";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import Metadata from "../components/Metadata.jsx";
import SingleEntry from "../components/SingleEntry.jsx";

export default class BlogIndex extends React.Component {
  render() {
    // Handle graphql errors
    if (this.props.errors && this.props.errors.length) {
      this.props.errors.forEach(({ message }) => {
        console.error(`BlogIndex render err: ${message}`);
      });
      return <h1>Errors found: Check the console for details</h1>;
    }
    const edges = parse(this.props);

    return (
      <div>
        <Metadata />
        <Header />
        <div id="blog-container" style={{ maxWidth: 800 }}>
          <h1>Blog</h1>
          {edges.map((node) => (
            <SingleEntry
              key={node.title}
              title={node.title}
              date={node.date}
              snippet={node.excerpt}
              href={node.url}
              newTab={false}
            />
          ))}
          <div style={{ height: "80px" }} />
        </div>
        <Footer />
      </div>
    );
  }
}

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            date
            title
          }
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
`;
