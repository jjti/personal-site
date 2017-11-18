import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";

import "./index.css";

const TemplateWrapper = ({ children }) => (
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

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
