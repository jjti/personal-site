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
          <p className="social">
            {"Email: "}
            <a href="joshuatimmons1@gmail.com" target="_blank">
              joshuatimmons1@gmail.com
            </a>
          </p>
          <p className="social">
            {"LinkedIn: "}
            <a
              href="https://www.linkedin.com/in/joshua-timmons-1172a961/"
              target="_blank"
            >
              joshua-timmons
            </a>
          </p>
          <p className="social">
            {"ResearchGate: "}
            <a
              href="https://www.researchgate.net/profile/Joshua_Timmons"
              target="_blank"
            >
              researchgate.net/profile/Joshua_Timmons
            </a>
          </p>
          <p className="social">
            {"GitHub: "}
            <a href="https://github.com/JJTimmons" target="_blank">
              github.com/JJTimmons
            </a>
          </p>
        </div>
        <div id="footer-right">
          <img src={face} id="footer-face" />
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
