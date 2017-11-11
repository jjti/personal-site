import React from "react";
import Link from "gatsby-link";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default props => (
	<div>
		<Header />
		<section>
			<h1>Not Found</h1>
			<p>You just hit a route that doesn't exist... the sadness.</p>
			<p>
				Use a link in the header or footer, or{" "}
				<span>
					<Link to="/">click here</Link>
				</span>
				{", "}
				to navigate to the rest of the site
			</p>
		</section>
		<Footer resolutions={props.data.file.childImageSharp.resolutions} />
	</div>
);

export const query = graphql`
	query FourOhFourFooterImage {
		file(relativePath: { eq: "components/face.png" }) {
			childImageSharp {
				resolutions(height: 205, width: 205) {
					...GatsbyImageSharpResolutions_noBase64
				}
			}
		}
	}
`;
