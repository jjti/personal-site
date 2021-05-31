import React from "react";

import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import Metadata from "../components/Metadata.jsx";
import SingleEntry from "../components/SingleEntry.jsx";

export default ({ pageContext: { nodes } }) => (
  <div>
    <Metadata />
    <Header />
    <div id="blog-container" style={{ maxWidth: 800 }}>
      <h1>Blog</h1>
      {nodes.map((node) => (
        <SingleEntry
          key={node.title}
          title={node.title}
          date={node.date}
          snippet={node.excerpt}
          href={node.url}
          newTab={false}
        />
      ))}
      <div style={{ height: "80px" }} />
    </div>
    <Footer />
  </div>
);
