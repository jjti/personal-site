import React from "react";

import "./Footer.css";
import Face from "./Face.jsx";

export default () => (
  <div>
    <footer>
      <h3>About</h3>
      <div className="footer-row">
        <div id="footer-left">
          <div>
            <p>
              I'm a software engineer at{" "}
              <a href="https://aws.amazon.com/">AWS</a> working on the Data
              Services team of <a href="https://aws.amazon.com/ebs/">EBS</a>.
              Our team focuses on improving the hydration performance of EBS
              volumes (for faster EC2 boot times, for example).
            </p>
            <p>
              In the past I made DNA assembly software at{" "}
              <a href="https://latticeautomation.com/">Lattice Automation</a>{" "}
              and did cancer research at BIDMC/Harvard Medical School.
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
