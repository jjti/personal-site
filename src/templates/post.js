import { graphql } from "gatsby";
import Link from "gatsby-link";
import React from "react";
import Header from "../components/Header.jsx";
import "./post.css";
import "./prismjs.css";

export default ({
  data: { markdownRemark: post },
  pageContext: { next, prev }
}) => (
  <div>
    <Header key="header" />
    <div className="Post">
      <div className="blog-header san-serif">
        <h1>{post.frontmatter.title}</h1>
        <h6 className="date lightGrayColor">{post.frontmatter.date}</h6>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: post.html }}
        className="blog-body"
      />
      <div className="footer-sep" />
      <footer className="blog-footer san-serif" key="blog-footer-body">
        {prev && (
          <Link to={`/${prev.url}`} className="footer-post last-post">
            <h5 style={{ marginLeft: "auto" }} className="lightGrayColor">
              Last
            </h5>
            {prev.frontmatter.title}
          </Link>
        )}
        {next && (
          <Link to={`/${next.url}`} className="footer-post next-post">
            <h5 className="lightGrayColor">Next</h5>
            {next.frontmatter.title}
          </Link>
        )}
      </footer>
    </div>
  </div>
);

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
