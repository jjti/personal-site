import React, { Component } from "react";
import { Header, Footer } from "../components";
import { Switch, Route, Redirect } from "react-router-dom";
import marked from "marked";

// eslint-disable-next-line import/no-webpack-loader-syntax
const IHCQuant = require.context('!markdown-with-front-matter!./blog', false, /.md$/);

console.log(IHCQuant)

export default class Blog extends Component {
	render() {
		return (
			<div className="Container">
				<Header />
				<h2>Blog</h2>
				{IHCQuant.__content}
				<Switch>
					<Route
						path="/blog/*"
						component={() => <Redirect path="/blog" />}
					/>
				</Switch>
				<Footer />
			</div>
		);
	}
}
