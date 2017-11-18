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
        <Header key="header" />
        <div className="Post">
          <div className="blog-header">
            <h1>{post.frontmatter.title}</h1>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: post.html }}
            className="blog-body"
          />
          <div className="footer-sep" />
          <footer
            className="blog-footer"
            key="blog-footer-body"
          >
            {prev && (
              <div className="footer-post last-post">
                <h6 style={{ marginLeft: "auto" }}>Last</h6>
                <Link to={prev.url} className="onHoverUnderline">
                  {prev.frontmatter.title}
                </Link>
              </div>
            )}
            {next && (
              <div className="footer-post next-post">
                <h6>Next</h6>
                <Link to={next.url} className="onHoverUnderline">
                  {next.frontmatter.title}
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
