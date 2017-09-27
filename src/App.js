import React, { Component } from "react";
import "./App.css";

class App extends Component {
	render() {
		return (
			<div className="Container">
				<section>
					<header>joshua timmons</header>
					<p className="SubHeader">a personal site</p>
				</section>
				<hr />
				<footer>
					<div className="about">
						<h2>About</h2>
						<p>
							Hello! My name's Josh. I am software engineer at
							<a href="http://latticeautomation.com/">
								{" "}
								Lattice Automation Inc.{" "}
							</a>
							and a research assistant at BIDMC and Harvard
							Medical School. This site is 50% a repository and
							50% an excuse to claim the domain.
						</p>
					</div>
					<a href="https://www.linkedin.com/in/joshua-timmons-1172a961/" id="linkedin" className="social-button">
						LinkedIn
					</a>
					<a href="https://www.researchgate.net/profile/Joshua_Timmons" id="researchgate" className="social-button">
						ResearchGate
					</a>
				</footer>
			</div>
		);
	}
}

export default App;
