/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `POW!`,
    description: `Take charge of your menstrual cycle. POW! is an adaptable privacy-first menstrual tracker app.`,
    twitter: "@usepowapp",
    image: "https://www.usepow.app/static/some.png",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve("./src/templates/public.js"),
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
        },
      },
    },
  ],
}
