import React, { Component } from "react";
import { Header, Footer, SingleEntry as BlogPost } from "../components";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import marked from "marked";

const posts = require.context("./blog", false, /.jsx$/);
const blogs = posts.keys().map(k => posts(k).default);

const BlogHome = ({ history }) => (
	<section>
		<h2>Blog</h2>
		{blogs.map(b => (
			<BlogPost
				key={b.title}
				{...b}
				href={`/blog/${b.href}`}
				newTab={false}
			/>
		))}
	</section>
);

export default class Blog extends Component {
	render() {
		return (
			<div className="Container">
				<Header />
				<Switch>
					{blogs.map(b => (
						<Route
							key={b.href}
							path={`/blog/${b.href}`}
							render={() => (
								<section>
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
						component={withRouter(BlogHome)}
					/>
					<Route path="*" component={() => <Redirect to="/blog" />} />
				</Switch>
				<Footer />
			</div>
		);
	}
}
