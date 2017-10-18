import React from "react";
import Link from "gatsby-link";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import SingleEntry from "../components/SingleEntry.jsx";

export default class BlogIndex extends React.Component {
	render() {
		// Handle graphql errors
		if (this.props.errors && this.props.errors.length) {
			this.props.errors.forEach(({ message }) => {
				console.error(`BlogIndex render errr: ${message}`);
			});
			return <h1>Errors found: Check the console for details</h1>;
		}

		const edges = this.props.data.allMarkdownRemark.edges;
		edges.sort((a, b) => {
			const d1 = new Date(a.node.frontmatter.date).getTime();
			const d2 = new Date(b.node.frontmatter.date).getTime();
			return d2 - d1;
		});

		return (
			<div>
				<Header />
				<h2>Blog</h2>
				{edges.map(({ node }, i) => (
					<SingleEntry
						key={node.frontmatter.title}
						title={node.frontmatter.title}
						date={node.frontmatter.date}
						snippet={node.excerpt}
						href={node.url}
						newTab={false}
					/>
				))}
				<div style={{ height: "80px" }} />
				<Footer />
			</div>
		);
	}
}

export const pageQuery = graphql`
	query BlogIndexQuery {
		allMarkdownRemark {
			edges {
				node {
					frontmatter {
						title
						date
					}
					excerpt(pruneLength: 250)
					url
					html
				}
			}
		}
	}
`;
