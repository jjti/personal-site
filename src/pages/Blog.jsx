import React, { Component } from "react";
import { Header, Footer, SingleEntry as BlogPost } from "../components";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

// eslint-disable-next-line import/no-webpack-loader-syntax
const posts = require.context(
	"!markdown-with-front-matter-loader!./blog",
	false,
	/.md$/
);

const BlogHome = ({ history }) => (
	<div className="Blog-container">
		<h2>Blog</h2>
		{posts.keys().map(k => (
			<BlogPost
				key={k}
				{...posts(k)}
				href={`/blog/${posts(k).href}`}
				newTab={false}
			/>
		))}
	</div>
);

export default class Blog extends Component {
	render() {
		return (
			<div className="Container">
				<Header />
				<Switch>
					{posts.keys().map(k => (
						<Route
							key={`${k}_route`}
							path={`/blog/${posts(k).href}`}
							render={() => (
								<div
									className="markdown-body"
									dangerouslySetInnerHTML={{
										__html: posts(k).__content
									}}
								/>
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
