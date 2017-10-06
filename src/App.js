import React, { Component } from "react";

import { Footer } from "./components";
import "./index.css";
import "./App.css";

import Resume from "./pages/files/Resume.pdf";

class App extends Component {
  render() {
    return (
      <div className="Container">
        <section>
          <header>joshua timmons</header>
          <p className="SubHeader">a personal site</p>
        </section>
        <section>
          <h2>Interests</h2>
          <div className="about-columns">
            <p>
              I enjoy working on projects that merge programming with biology. I
              spent several years in wetlabs, with bacteria, algae, and yeast,
              on projects that spanned trying to improve the energy density of
              microbial fuel cells to testing neurokinases for immunogenic
              response.
            </p>
            <p>
              Since learning to program, I have designed an image processing
              workflow to study Tumor Treating Fields and designed tools to
              automate plasmid assembly protocols (restriction digest and MoClo
              Assembly). Over the past year I have also spent a time learning
              and running moleculary dynamics simulations.
            </p>
          </div>
        </section>
        <hr />
        <section>
          <h2 style={{ marginBottom: "45px" }}>Contents</h2>
          <div className="contents" style={{ float: "left" }}>
            <h6>FILES</h6>
            <ul>
              <li>
                <a target="_blank" href={Resume}>
                  Resume
                </a>
              </li>
              <li>
                <a href="/publications">Publications</a>
              </li>
            </ul>
          </div>
          <div className="contents" style={{ float: "right" }}>
            <a href="/blog">
              <h6>BLOG</h6>
            </a>
            <ul>
              <li>
                <a href="/blog">Blog</a>
              </li>
            </ul>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default App;
