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
        <div className="Post" key="post">
          <div className="blog-header">
            <h2>{post.frontmatter.title}</h2>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: post.html }}
            className="blog-body"
          />
        </div>
        <hr key="blog-footer-hr" style={{ margin: "70px 0 10px 0" }} />,
        <footer
          className="blog-footer"
          key="blog-footer-body"
          style={{ paddingBottom: "0" }}
        >
          <div className="next-post">
            {next && (
              <div>
                <h6>Next Article</h6>
                <Link to={next.url}>
                  <h3>{next.frontmatter.title}</h3>
                </Link>
                <p>{next.excerpt}</p>
              </div>
            )}
          </div>
          {prev && (
            <div className="last-post">
              <h6>Last Article</h6>
              <Link to={prev.url}>
                <h3>{prev.frontmatter.title}</h3>
              </Link>
              <p>{prev.excerpt}</p>
            </div>
          )}
        </footer>
        <Link to="/blog" className="all-button">
          All Posts
        </Link>
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
