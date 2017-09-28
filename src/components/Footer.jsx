import React, { Component } from "react";

const Footer = () => (
  <div>
    <hr />
    <footer>
      <div>
        <h2>About</h2>
        <p>
          Hello! My name's Josh. I'm a software engineer at
          <a href="http://latticeautomation.com/"> Lattice Automation Inc. </a>
          and a research assistant at BIDMC and Harvard Medical School. This
          site is 50% a repository and 50% an excuse to claim the domain.
        </p>
      </div>
      <a
        href="https://www.linkedin.com/in/joshua-timmons-1172a961/"
        id="linkedin"
        className="app-button"
      >
        LinkedIn
      </a>
      <a
        href="https://www.researchgate.net/profile/Joshua_Timmons"
        id="researchgate"
        className="app-button"
      >
        ResearchGate
      </a>
      <a
        href="https://github.com/JJTimmons"
        id="github"
        className="app-button"
      >
        GitHub
      </a>
    </footer>
  </div>
);

export default Footer;
