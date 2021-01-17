/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `POW! — Take charge of your menstrual cycle`,
    description: `Get to know your cycle, using your own words without worrying that the data will end up in the hands of Facebook.`,
    twitter: "@raae",
    image: "https://www.usepow.app/some.png",
  },
  plugins: [
    {
      resolve: `fathom-tracking`,
      options: {
        site: process.env.FATHOM_SITE,
        spa: "auto",
        includedDomains: process.env.FATHOM_INCLUDED_DOMAINS,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-material-ui`,
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve("./src/templates/mdx-page.js"),
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `POW!`,
        short_name: `POW!`,
        start_url: `/`,
        background_color: `#fafafa`,
        theme_color: `#e53935`,
        display: `standalone`,
        icon: "static/icon.png",
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          "/manifest.webmanifest": [
            // Requirement of Blockstack
            "Access-Control-Allow-Origin: *",
          ],
          "/manifest.json": [
            // Copy of manifest for Dappity
            "Access-Control-Allow-Origin: *",
          ],
        },
      },
    },
  ],
}
