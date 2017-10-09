import React, { Component } from "react";

import { Footer } from "./components";
import Resume from "./pages/files/Resume.pdf";
import Blogs from "./pages/blog/index.js";

import "./index.css";
import "./App.css";

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
              Since learning to program, I have created an image processing
              workflow to study Tumor Treating Fields and designed tools to
              automate plasmid assembly protocols (restriction digest and MoClo
              Assembly). I also have an interst in using molecular dynamics to
              gain mechanistic insight into tumor treating fields and
              nano-second pulsed electric fields.
            </p>
          </div>
        </section>
        <hr />
        <h2 style={{ marginBottom: "45px" }}>Contents</h2>
        <section id="contents">
          <div className="contents-col">
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
          <div className="contents-col">
            <a href="/blog">
              <h6>BLOG</h6>
            </a>
            <ul>
              {Blogs.slice(0, 6).map((b, i) => (
                <li
                  key={b.href}
                  className={`${i > 2 ? "mobile-content-show" : null}`}
                >
                  <a href={b.href}>{b.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="contents-col mobile-content-hide">
            <br />
            <ul>
              {Blogs.slice(3, 6).map(b => (
                <li key={b.href}>
                  <a href={b.href}>{b.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default App;
