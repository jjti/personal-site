import React from "react";
import Link from "gatsby-link";

import Header from "../components/Header.jsx";
import "./post.css";
import "./prismjs.css";

export default class BlogPost extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;

    const { next, prev } = this.props.pathContext;

    return (
      <div>
        <Header key="header" />,
        <div className="Post">
          <div className="blog-header">
            <h1>{post.frontmatter.title}</h1>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: post.html }}
            className="blog-body"
          />
          <div style={{ height: "80px" }} />
          <footer
            className="blog-footer"
            key="blog-footer-body"
          >
            {prev && (
              <div className="last-post">
                <h6 style={{ marginLeft: "auto" }}>Last</h6>
                <Link to={prev.url}>
                  <h3>{prev.frontmatter.title}</h3>
                </Link>
              </div>
            )}
            {next && (
              <div className="next-post">
                <h6>Next</h6>
                <Link to={next.url}>
                  <h3>{next.frontmatter.title}</h3>
                </Link>
              </div>
            )}
          </footer>
        </div>
      </div>
    );
  }
}

// NOTE: The $id var is passed in via context when calling createPage in gatsby-node.js
export const pageQuery = graphql`
  query PostByUrl($url: String!) {
    markdownRemark(url: { eq: $url }) {
      frontmatter {
        title
        date
      }
      html
    }
  }
`;
