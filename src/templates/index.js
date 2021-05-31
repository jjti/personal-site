import React from "react";
import Link from "gatsby-link";

import Footer from "../components/Footer.jsx";
import Metadata from "../components/Metadata.jsx";
import Resume from "../files/Resume.pdf";
import "./index.css";

export default ({ pageContext: { nodes } }) => (
  // This margin calculation sucks and is based totally on average size in px
  <div style={{ margin: "calc((100vh - 750px) / 4) auto" }}>
    <Metadata />
    <section>
      <header>joshua timmons</header>
    </section>
    <section id="contents">
      <div className="contents-col">
        <h6 className="lightGrayColor">FILES</h6>
        <ul style={{ marginLeft: 0 }}>
          <li>
            <a href={Resume} className="onHoverUnderline">
              Resume
            </a>
          </li>
          <li>
            <Link to="/publications" className="onHoverUnderline">
              Publications
            </Link>
          </li>
        </ul>
      </div>
      <div className="contents-col contents-col-large contents-col-left">
        <Link to="/blog" className="blog-link onHoverUnderline">
          <h6 className="lightGrayColor">BLOG</h6>
        </Link>
        <ul style={{ marginLeft: 0 }}>
          {nodes.map((node, i) => (
            <li
              className={`${i > 2 ? "mobile-content-show" : null}`}
              key={node.url}
            >
              <Link to={node.url} className="onHoverUnderline">
                {node.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="contents-col contents-col-large mobile-content-hide">
        <br />
        <ul>
          {nodes.slice(3, 6).map((node) => (
            <li key={`${node.url}_2`}>
              <Link to={node.url} className="onHoverUnderline">
                {node.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
    <Footer />
  </div>
);
