import React from "react";

import face from "./files/IMG_3363_2.png";

import "./Footer.css";

const Footer = () => (
  <div>
    <hr />
    <footer>
      <h2>About</h2>
      <div className="footer-row">
        <div id="footer-left">
          <p>
            Hello! My name's Josh. I'm a software engineer at
            <a href="http://latticeautomation.com/">
              {" "}
              Lattice Automation Inc.{" "}
            </a>
            and a research assistant at BIDMC and Harvard Medical School. This
            site is 50% a repository and 50% an excuse to claim the domain.
          </p>
          <div>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              <li>
                {"Email: "}
                <a
                  href="mailto:&#106;&#111;&#115;&#104;&#117;&#097;&#116;&#105;&#109;&#109;&#111;&#110;&#115;&#049;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;"
                  target="_top"
                >
                  joshuatimmons1@gmail.com
                </a>
              </li>
              <li>
                {"LinkedIn: "}
                <a
                  href="www.linkedin.com/in/JJTimmons"
                  target="_blank"
                >
                  linkedin.com/in/JJTimmons
                </a>
              </li>
              <li>
                {"ResearchGate: "}
                <a
                  href="https://www.researchgate.net/profile/Joshua_Timmons"
                  target="_blank"
                >
                  researchgate.net/profile/Joshua_Timmons
                </a>
              </li>
              <li>
                {"GitHub: "}
                <a href="https://github.com/JJTimmons" target="_blank">
                  github.com/JJTimmons
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div id="footer-right">
          <img src={face} id="footer-face" />
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
