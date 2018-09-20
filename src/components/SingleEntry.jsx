import Link from "gatsby-link";
import React from "react";
import "./SingleEntry.css";

export default ({ title, date, snippet, href, newTab = true }) => {
  return (
    <div className="single-entry">
      <br />
      <Link to={href} target={newTab ? "_blank" : null}>
        <div className="single-entry-header">
          <h3>{title}</h3>
          {newTab && <p>Outside Link</p>}
        </div>
        <h6 className="date lightGrayColor">
          {new Date(date).toLocaleDateString()}
        </h6>
        <p className="snippet">{snippet}</p>
      </Link>
    </div>
  );
};
