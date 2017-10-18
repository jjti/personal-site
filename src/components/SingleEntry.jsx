import React from "react";
import Link from "gatsby-link";

import "./SingleEntry.css";

const SingleEntry = ({ title, date, snippet, href, newTab = true }) => {
	return (
		<div className="single-entry">
			<br />
			<Link to={href} target={newTab ? "_blank" : null}>
				<div className="single-entry-header">
					<h3>{title}</h3>
					{newTab && <p>Outside Link</p>}
				</div>
				<p className="date">{new Date(date).toLocaleDateString()}</p>
				<p className="snippet">{snippet}</p>
			</Link>
		</div>
	);
};

export default SingleEntry;
