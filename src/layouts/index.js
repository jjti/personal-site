import React from "react";
import Helmet from "react-helmet";
import "./index.css";

export default ({ children }) => (
  <div>
    <Helmet
      meta={[
        { name: "description", content: "personal site" },
        {
          name: "keywords",
          content: "joshua, timmons, software, programming, biology"
        }
      ]}
    >
      <meta charSet="utf-8" />
      <title>Joshua Timmons</title>
      <div className="root-container">{children()}</div>
    </Helmet>
  </div>
);
