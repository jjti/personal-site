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
        short_name: "Timmons",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        display: "minimal-ui",
        icons: [
          {
            src: `/static/favicon.icon`,
            sizes: `150x150`,
            type: `image/ico`
          }
        ]
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
        path: path.resolve("./content/blog") // Tell it where to find the files
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
          `gatsby-remark-smartypants`,
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-external-links",
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-"
            }
          }
        ]
      }
    }
  ]
};
