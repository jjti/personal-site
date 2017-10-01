import React, { Component } from "react";

import { Footer } from "./components";
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
              Since learning to program, I've focused on projects where I can
              use both, including the design of an image processing workflow to
              study Tumor Treating Fields and the automation of the plasmid
              assembly protocols (restriction digest and MoClo Assembly). Over
              the past year I've also spent a significant amount of time
              learning and running moleculary dynamics simulations.
            </p>
          </div>
        </section>
        <hr />
        <section className="full">
          <h2 style={{ marginBottom: "45px" }}>Contents</h2>
          <a target="_blank" href={Resume} className="app-button">
            RESUME
          </a>
          <a href="/publications" className="app-button">
            PUBLICATIONS
          </a>
          <a href="/writing" className="app-button">
            WRITING
          </a>
          <a href="/blog" className="app-button">
            BLOG
          </a>
        </section>
        <Footer />
      </div>
    );
  }
}

export default App;
