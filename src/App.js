import React, { Component } from 'react';
import rg from './rg.png';
import li from './linkedin.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="Container">
        <section>
          <header>joshua timmons</header>
          <p className="SubHeader">a personal site</p>
        </section>
        <hr />
        <section className="two-column-section">
          <div className="one-column">
            <h2>About</h2>
            <p>Hello! My name's Josh. I am software engineer at 
            <a href="http://latticeautomation.com/"> Lattice Automation Inc. </a>
            and a research assistant at
            BIDMC and Harvard Medical School. This site is 50% a repository
            and 50% an excuse to claim the domain.</p>
          </div>
          <div className="one-column" style={{ selfAlign: "right" }}>
            <a href="https://www.linkedin.com/in/joshua-timmons-1172a961/">
              <img src={li} alt="LinkedIn" className="social-button" style={{ maxWidth: "2.67em" }}/>
            </a>
            <a href="https://www.researchgate.net/profile/Joshua_Timmons">
              <img src={rg} alt="ResearchGate" className="social-button" />
            </a>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
