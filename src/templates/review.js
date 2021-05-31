import Link from "gatsby-link";
import React from "react";

import Header from "../components/Header.jsx";
import "./post.css";
import "./prismjs.css";

export default ({ pageContext: { next, prev, rating, body, title, date } }) => (
  <div>
    <Header key="header" />
    <div className="Post">
      <div className="blog-header sans-serif">
        <h1>{title}</h1>
        <h6 style={{ textDecoration: "underline" }}>Review: {rating}/5</h6>
        <h6 className="date lightGrayColor">{`${new Date(date).getMonth() +
          1}/${new Date(date).getDay()}/${new Date(date).getFullYear()}`}</h6>
      </div>
      <div dangerouslySetInnerHTML={{ __html: body }} className="blog-body" />
      <div className="footer-sep" />
      <footer className="blog-footer" key="blog-footer-body">
        {prev && (
          <Link to={prev.url} className="footer-post last-post">
            <h5 style={{ marginLeft: "auto" }} className="lightGrayColor">
              Last
            </h5>
            {prev.title}
          </Link>
        )}
        {next && (
          <Link to={next.url} className="footer-post next-post">
            <h5 className="lightGrayColor">Next</h5>
            {next.title}
          </Link>
        )}
      </footer>
    </div>
  </div>
);
