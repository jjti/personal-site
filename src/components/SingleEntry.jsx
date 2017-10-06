import React from "react";

import "./SingleEntry.css";

const SingleEntry = ({ title, date, blurb, href, newTab = true }) => (
	<div className="single-entry">
		<br />
		<a href={href} target={newTab ? "_blank" : null}>
			<div class="single-entry-header">
				<h3>{title}</h3>
				{newTab && <p>Link</p>}
			</div>
			<p className="date">{date}</p>
			<p className="blurb">{blurb}</p>
		</a>
	</div>
);

export default SingleEntry;
