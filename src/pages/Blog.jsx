import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import marked from "marked";

import OutsideArticles from "./blog/outside/OutsideArticles.jsx";
import { Header, Footer, SingleEntry as BlogPreview } from "../components";
import Blogs from "./blog/index.js";

import "./Blog.css";

// no article has been selected, render the preview list in /blog
const BlogHome = ({ history }) => (
	<section>
		<h2>Blog</h2>
		{Blogs.map(b => (
			<BlogPreview
				key={b.title}
				{...b}
				href={b.href}
				newTab={false}
			/>
		))}
		{OutsideArticles()}
	</section>
);

// render header, footer, and routes to the posts
export default class Blog extends Component {
	render() {
		return (
			<div className="Container">
				<Header />
				<Switch>
					{Blogs.map(b => (
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
				<Footer />
			</div>
		);
	}
}
