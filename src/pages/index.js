import React from "react";
import Link from "gatsby-link";
import Img from "gatsby-image";

import CV from "../files/CV.pdf";
import Footer from "../components/Footer.jsx";

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
      <div>
        <section>
          <header>joshua timmons</header>
        </section>
        <section>
          <h3>Interests</h3>
          <div className="about-columns">
            <p>
              I enjoy working on projects that merge programming with biology. I
              spent several years in wetlabs, with bacteria, algae, and yeast,
              on projects that spanned trying to improve the energy density of
              microbial fuel cells to testing neurokinases for immunogenic
              response.
            </p>
            <p>
              Since learning to program, I have created an image processing
              workflow to study Tumor Treating Fields and designed tools to
              automate plasmid assembly protocols (restriction digest and MoClo
              Assembly). I am also intersted in using molecular dynamics for
              mechanistic insight into tumor treating fields and nano-second
              pulsed electric fields.
            </p>
          </div>
        </section>
        <hr />
        <h3 style={{ marginBottom: "45px" }}>Contents</h3>
        <section id="contents">
          <div className="contents-col">
            <h6>FILES</h6>
            <ul style={{ marginLeft: 0 }}>
              <li>
                <a target="_blank" href={CV} className="onHoverUnderline">
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
          <div className="contents-col">
            <h6>BLOG</h6>
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
          <div className="contents-col mobile-content-hide">
            <br />
            <ul>
              {edges.slice(3, 6).map(({ node }) => (
                <li key={`${node.url}_2`}>
                  {" "}
                  <Link to={node.url} className="onHoverUnderline">
                    {node.frontmatter.title}{" "}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <Footer
          resolutions={this.props.data.file.childImageSharp.resolutions}
        />
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
    file(relativePath: { eq: "components/face.png" }) {
      childImageSharp {
        resolutions(height: 205, width: 205) {
          ...GatsbyImageSharpResolutions_noBase64
        }
      }
    }
  }
`;
