import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import marked from "marked";

import OutsideArticles from "./blog/outside/OutsideArticles.jsx";
import { Header, SingleEntry as BlogPreview } from "../components";
import Blogs from "./blog/index.js";

import "./Blog.css";
import "../qtcreator_light.css";

// no article has been selected, render the preview list in /blog
const BlogHome = ({ history }) => (
	<section>
		<h2>Blog</h2>
		{Blogs.map(b => (
			<BlogPreview key={b.title} {...b} href={b.href} newTab={false} />
		))}
		{OutsideArticles()}
	</section>
);

// a footer for going to the next article, last article or all articles
const randInd = () => Math.floor(Math.random() * Blogs.length);
const BlogFooter = ({ index }) => {
	let nextInd = randInd();
	let lastInd = randInd();
	while (nextInd === index || nextInd === index + 1) nextInd = randInd();
	while (lastInd === index || lastInd === index + 1) lastInd = randInd();
	const next = Blogs[index - 1] || Blogs[nextInd];
	const last = Blogs[index + 1] || Blogs[lastInd];

	return [
		<hr key="blog-footer-hr" style={{ margin: "70px 0" }} />,
		<footer
			className="blog-footer"
			key="blog-footer-body"
			style={{ paddingBottom: "0" }}
		>
			<div className="next-post">
				<h6>Next Article</h6>
				<a href={next.href}>
					<h3>{next.title}</h3>
				</a>
				<p>{next.blurb}</p>
				<a className="app-button" href="/blog">
					All Posts
				</a>
			</div>
			<div className="last-post">
				<h6>Last Article</h6>
				<a href={last.href}>
					<h3>{last.title}</h3>
				</a>
				<p>{last.blurb}</p>
			</div>
		</footer>
	];
};

// render header, footer, and routes to the posts
export default class Blog extends Component {
	render() {
		return (
			<div className="Container">
				<Header />
				<Switch>
					{Blogs.map((b, i) => (
						<Route
							path={b.href}
							exact
							key={b.href}
							render={() => (
								<section>
									<div className="blog-header">
										<h2>{b.title}</h2>
									</div>
									<div
										className="blog-body"
										dangerouslySetInnerHTML={{
											__html: marked(b.__content)
										}}
									/>
									<BlogFooter index={i} />
								</section>
							)}
						/>
					))}
					<Route
						exact
						path="/blog"
						key="/blog"
						component={withRouter(BlogHome)}
					/>
					<Route
						path="*"
						key="/*"
						component={() => <Redirect to="/blog" />}
					/>
				</Switch>
			</div>
		);
	}
}
