const path = require("path");

module.exports = {
	siteMetadata: {
		title: `Joshua Timmons Personal Site`
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-catch-links`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: "Joshua Timmons Personal Site",
				short_name: "Timmons Site",
				start_url: "/",
				background_color: "#ffffff",
				theme_color: "#ffffff",
				display: "minimal-ui",
				icons: [
					{
						// Everything in /static will be copied to an equivalent
						// directory in /public during development and build, so
						// assuming your favicons are in /static/favicons,
						// you can reference them here
						src: `/static/favicon.icon`,
						sizes: `150x150`,
						type: `image/ico`
					}
				]
			}
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [`gatsby-remark-autolink-headers`]
			}
		},
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: "UA-108371876-1",
				// Setting this parameter is optional
				anonymize: true
			}
		},
		`gatsby-plugin-offline`,
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "posts", // Name this source
				path: path.resolve("./content") // Tell it where to find the files
			}
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "src", // Name this source
				path: path.resolve("./src") // Tell it where to find the files
			}
		},
		{
			resolve: "gatsby-transformer-remark",
			options: {
				plugins: [
					"gatsby-remark-copy-linked-files",
					{
						resolve: `gatsby-remark-images`,
						options: {
							// It's important to specify the maxWidth (in pixels) of
							// the content container as this plugin uses this as the
							// base for generating different widths of each image.
							maxWidth: 590,
							// Remove the default behavior of adding a link to each
							// image.
							linkImagesToOriginal: false
						}
					},
					{
						resolve: `gatsby-remark-prismjs`,
						options: {
							// Class prefix for <pre> tags containing syntax highlighting;
							// defaults to 'language-' (eg <pre class="language-js">).
							// If your site loads Prism into the browser at runtime,
							// (eg for use with libraries like react-live),
							// you may use this to prevent Prism from re-processing syntax.
							// This is an uncommon use-case though;
							// If you're unsure, it's best to use the default value.
							classPrefix: "language-"
						}
					}
				]
			}
		}
	]
};
