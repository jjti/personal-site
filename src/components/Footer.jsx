import Img from "gatsby-image";
import React from "react";

import "./Footer.css";
import Face from "./Face.jsx";

export default props => {
  return (
    <div>
      <footer>
        <h3>About</h3>
        <div className="footer-row">
          <div id="footer-left">
            <div>
              <p>
                I'm a software engineer at{" "}
                <a href="http://latticeautomation.com/">
                  Lattice Automation Inc.
                </a>{" "}
                and a research assistant at BIDMC/Harvard Medical School. My
                interests include computational biology, software engineering,
                and molecular simulation.
              </p>
              <ul id="footer-social-list" style={{ marginLeft: 0 }}>
                <li>
                  {"Email: "}
                  <a
                    href="mailto:&#106;&#111;&#115;&#104;&#117;&#097;&#116;&#105;&#109;&#109;&#111;&#110;&#115;&#049;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;"
                    target="_top"
                    className="onHoverUnderline"
                  >
                    joshuatimmons1@gmail.com
                  </a>
                </li>
                <li>
                  {"LinkedIn: "}
                  <a
                    href="https://www.linkedin.com/in/JJTimmons"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="onHoverUnderline"
                  >
                    linkedin.com/in/jjtimmons
                  </a>
                </li>
                <li>
                  {"ResearchGate: "}
                  <a
                    href="https://www.researchgate.net/profile/Joshua_Timmons"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="onHoverUnderline"
                  >
                    researchgate.net/profile/Joshua_Timmons
                  </a>
                </li>
                <li>
                  {"GitHub: "}
                  <a
                    href="https://github.com/JJTimmons"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="onHoverUnderline"
                  >
                    github.com/jjtimmons
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div id="footer-right">
            <Face />
          </div>
        </div>
      </footer>
    </div>
  );
};
