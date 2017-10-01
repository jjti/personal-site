import React from "react";

const SingleEntry = ({ title, date, blurb, href, newTab = true }) => (
	<div className="writing-article">
		<br />
		<a href={href} target={newTab ? "_blank" : null}>
			<h3>{title}</h3>
			<p className="date">{date}</p>
			<p>{blurb}</p>
		</a>
	</div>
);

export default SingleEntry;
