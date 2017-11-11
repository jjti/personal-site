import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";

const Header = () => (
	<div
		style={{
			background: "rebeccapurple",
			marginBottom: "1.45rem"
		}}
	>
		<div
			style={{
				margin: "0 auto",
				maxWidth: 960,
				padding: "1.45rem 1.0875rem"
			}}
		>
			<h1 style={{ margin: 0 }}>
				<Link
					to="/"
					style={{
						color: "white",
						textDecoration: "none"
					}}
				>
					Gatsby
				</Link>
			</h1>
		</div>
	</div>
);

const TemplateWrapper = ({ children }) => (
	<div>
		<Helmet
			title="Joshua Timmons"
			meta={[
				{ name: "description", content: "personal site" },
				{
					name: "keywords",
					content: "joshua, timmons, software, programming, biology"
				}
			]}
		/>
		<div
			style={{
				margin: "0 auto",
				maxWidth: 960,
				padding: "0px 1.0875rem 1.45rem",
				paddingTop: 0
			}}
		>
			{children()}
		</div>
	</div>
);

TemplateWrapper.propTypes = {
	children: PropTypes.func
};

export default TemplateWrapper;
