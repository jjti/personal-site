import { graphql } from "gatsby";
import Link from "gatsby-link";
import React from "react";

import Footer from "../components/Footer.jsx";
import Metadata from "../components/Metadata.jsx";
import CV from "../files/CV.pdf";
import Resume from "../files/Resume.pdf";
import "../layouts/index.css";
import "./index.css";

export default class IndexPage extends React.Component {
  render = () => {
    let edges = this.props.data.allMarkdownRemark.edges;
    edges.sort((a, b) => {
      const d1 = new Date(a.node.frontmatter.date).getTime();
      const d2 = new Date(b.node.frontmatter.date).getTime();
      return d2 - d1;
    });
    edges = edges.slice(0, 6);

    return (
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
                <a href={CV} className="onHoverUnderline">
                  CV
                </a>
              </li>
              <li>
                <Link to="/publications" className="onHoverUnderline">
                  Publications
                </Link>
              </li>
            </ul>
          </div>
          <div className="contents-col contents-col-large">
            <Link to="/blog" className="blog-link onHoverUnderline">
              <h6 className="lightGrayColor">BLOG</h6>
            </Link>
            <ul style={{ marginLeft: 0 }}>
              {edges.map(({ node }, i) => (
                <li
                  className={`${i > 2 ? "mobile-content-show" : null}`}
                  key={node.url}
                >
                  <Link to={node.url} className="onHoverUnderline">
                    {node.frontmatter.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="contents-col contents-col-large mobile-content-hide">
            <br />
            <ul>
              {edges.slice(3, 6).map(({ node }) => (
                <li key={`${node.url}_2`}>
                  <Link to={node.url} className="onHoverUnderline">
                    {node.frontmatter.title}{" "}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <Footer />
      </div>
    );
  };
}

export const pageQuery = graphql`
  query HomePageBlogQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            date
          }
          url
        }
      }
    }
  }
`;
