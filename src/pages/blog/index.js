// get all blog posts (files ending in jsx) and return them, sorted by date
const posts = require.context(".", false, /.jsx$/);
const blogs = posts
	.keys()
	.map(k => posts(k).default)
	.map(b => {
		const d = new Date(b.date);
		const href = `/blog/${d.getFullYear()}/${d.getMonth() +
			1}/${d.getDate()}/${b.title.split(" ").join("-")}`;
		const date = d.getTime();

		console.log(href);

		return { ...b, href, date };
	}); // hyphenate title to url w/ date, convert time to sortable int
blogs.sort((a, b) => a.date - b.date);

export default blogs;
