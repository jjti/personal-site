const path = require("path");

require("dotenv").config();

module.exports = {
  siteMetadata: {
    siteUrl: `https://www.joshuatimmons.com/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-csv`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-remove-serviceworker`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-108371876-1",
        // Setting this parameter is optional
        anonymize: true,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts", // Name this source
        path: path.resolve("./content/blog"), // Tell it where to find the files
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src", // Name this source
        path: path.resolve("./src"), // Tell it where to find the files
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          `gatsby-remark-smartypants`,
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-external-links",
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
            },
          },
        ],
      },
    },
  ],
};
