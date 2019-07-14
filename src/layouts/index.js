import React from "react";
import Helmet from "react-helmet";
import "./index.css";

export default ({ children }) => (
  <>
    <Helmet title="Joshua Timmons" defer={false}>
      <title>Joshua Timmons</title>
      <meta charSet="utf-8" />
      <meta name="image" content="/face.png" />
      <meta
        name="description"
        content="The personal site of Joshua Timmons: a software engineer and researcher"
      />
      <meta
        name="keywords"
        content="joshua, timmons, software, programming, biology"
      />
      <div className="root-container">{children()}</div>
    </Helmet>
  </>
);
