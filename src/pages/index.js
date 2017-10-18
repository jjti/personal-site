import React from "react";
import Link from "gatsby-link";

import Resume from "../files/Resume.pdf";
import Footer from "../components/Footer.jsx";

import "./index.css";

export default class IndexPage extends React.Component {
	render = () => {
		let edges = this.props.data.allMarkdownRemark.edges;
		edges.sort((a, b) => {
			const d1 = new Date(a.node.frontmatter.date).getTime();
			const d2 = new Date(b.node.frontmatter.date).getTime();
			return d2 - d1;
		});
		edges = edges.slice(0, 6);

		return (
			<div className="Container">
				<section>
					<header>joshua timmons</header>
					<p className="SubHeader">a personal site</p>
				</section>
				<section>
					<h2>Interests</h2>
					<div className="about-columns">
						<p>
							I enjoy working on projects that merge programming
							with biology. I spent several years in wetlabs, with
							bacteria, algae, and yeast, on projects that spanned
							trying to improve the energy density of microbial
							fuel cells to testing neurokinases for immunogenic
							response.
						</p>
						<p>
							Since learning to program, I have created an image
							processing workflow to study Tumor Treating Fields
							and designed tools to automate plasmid assembly
							protocols (restriction digest and MoClo Assembly). I
							am also intersted in using molecular dynamics for
							mechanistic insight into tumor treating fields and
							nano-second pulsed electric fields.
						</p>
					</div>
				</section>
				<hr />
				<h2 style={{ marginBottom: "45px" }}>Contents</h2>
				<section id="contents">
					<div className="contents-col">
						<h6>FILES</h6>
						<ul style={{ marginLeft: 0 }}>
							<li>
								<a target="_blank" href={Resume}>
									Resume
								</a>
							</li>
							<li>
								<Link to="/publications">Publications</Link>
							</li>
						</ul>
					</div>
					<div className="contents-col">
						<Link to="/blog">
							<h6>BLOG</h6>
						</Link>
						<ul style={{ marginLeft: 0 }}>
							{edges.map(({ node }, i) => (
								<Link to={node.url} key={node.url}>
									<li
										className={`${i > 2
											? "mobile-content-show"
											: null}`}
									>
										{node.frontmatter.title}
									</li>
								</Link>
							))}
						</ul>

						<ul />
					</div>
					<div className="contents-col mobile-content-hide">
						<br />
						<ul>
							{edges.slice(3, 6).map(({ node }) => (
								<Link to={node.url} key={`${node.url}_2`}>
									<li>{node.frontmatter.title}</li>
								</Link>
							))}
						</ul>
					</div>
				</section>
				<Footer />
			</div>
		);
	};
}

export const pageQuery = graphql`
	query HomePageBlogQuery {
		allMarkdownRemark {
			edges {
				node {
					frontmatter {
						title
						date
					}
					url
				}
			}
		}
	}
`;
