import React from "react";
import LazyLoad from "react-lazyload";

import face from "./files/IMG_3363_2.png";
import "./Footer.css";

const Footer = () => (
  <div>
    <hr />
    <footer>
      <h2>About</h2>
      <div className="footer-row">
        <div id="footer-left">
          <div>
            <ul id="footer-social-list">
              <li>
                Hello! My name's Josh. I'm a software engineer at
                <a href="http://latticeautomation.com/">
                  {" "}
                  Lattice Automation Inc.{" "}
                </a>
                and a research assistant at BIDMC and Harvard Medical School.
                This site is 50% a repository and 50% an excuse to claim the
                domain.
              </li>
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
                  href="https://www.linkedin.com/in/JJTimmons"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/JJTimmons
                </a>
              </li>
              <li>
                {"ResearchGate: "}
                <a
                  href="https://www.researchgate.net/profile/Joshua_Timmons"
                  target="_blank"
                  rel="noopener noreferrer"
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
                >
                  github.com/JJTimmons
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div id="footer-right">
          <LazyLoad height={200} offset={50} once>
            <img src={face} id="footer-face" alt="face" />
          </LazyLoad>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
