import React, { Component } from "react";
import Link from "gatsby-link";

import "./Header.css";

export default class Header extends Component {
	scrolled = false; // is scroll event happening
	header = null; // the header class

	componentDidMount = () => {
		window.addEventListener("scroll", this.handleScroll);
	};

	componentWillUnmount = () => {
		window.removeEventListener("scroll", this.handleScroll);
	};

	handleScroll = () => {
		if (window.scrollY === 0 && this.scrolled && window.innerWidth > 640) {
			this.header.style.borderBottomColor = null;
			this.header.style.height = "100px";
			this.scrolled = false;
		} else if (
			window.scrollY !== 0 &&
			!this.scrolled &&
			window.innerWidth > 640
		) {
			this.header.style.borderBottomColor = "#dedede";
			this.header.style.height = "70px";
			this.scrolled = true;
		}
	};

	render() {
		return (
			<div className="Header-wrapper">
				<div
					className="Header"
					ref={ref => {
						this.header = ref;
					}}
				>
					<p id="back-button">
						<Link to="/">joshua timmons</Link>
					</p>
					<nav className="publications">
						<Link to="/publications">Publications</Link>
						<Link to="/blog">Blog</Link>
					</nav>
				</div>
			</div>
		);
	}
}
