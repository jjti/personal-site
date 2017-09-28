import React, { Component } from "react";
import { Link } from "react-router-dom";

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

	handleScroll = event => {
		const scrollTop = event.srcElement.body.scrollTop;
		console.log(scrollTop);
		if (scrollTop === 0 && this.scrolled) {
			this.header.style.borderBottomColor = null;
			this.header.style.height = "150px";
			this.scrolled = false;
		} else if (scrollTop !== 0 && !this.scrolled) {
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
						<Link to="/writing">Writing</Link>
					</nav>
				</div>
			</div>
		);
	}
}
