import React from "react";
import Helmet from "react-helmet";
import "./index.css";

export default ({ children }) => (
  <div>
    <Helmet
      title="Joshua Timmons"
      meta={[
        { name: "description", content: "personal site" },
        {
          name: "keywords",
          content: "joshua, timmons, software, programming, biology"
        }
      ]}
    />
    <div className="root-container">{children()}</div>
  </div>
);
