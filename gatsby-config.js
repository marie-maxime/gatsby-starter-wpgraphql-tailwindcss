require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `${process.env.GATSBY_SITE_NAME}`,
    description: `${process.env.GATSBY_SITE_DESCRIPTION}`,
    author: `@${process.env.GATSBY_SITE_AUTHOR}`,
    siteUrl: `${process.env.GATSBY_SITE_URL_PROTOCOL}://${process.env.GATSBY_SITE_URL_PATH}`,
    social: {
      twitter: `@${process.env.GATSBY_TWITTER_HANDLE_URL}`,
      email: `${process.env.GATSBY_EMAIL}`,
    },
  },
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `${process.env.GATSBY_SITE_NAME}`,
        short_name: `${process.env.GATSBY_SITE_NAME}`,
        start_url: `/`,
        background_color: process.env.GATSBY_PRIMARY_ACCENT_COLOR || `#0047E0`,
        theme_color: process.env.GATSBY_PRIMARY_ACCENT_COLOR || `#0047E0`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`,
      },
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-source-graphql`,
      options: {
        // This type will contain remote schema Query type
        typeName: `WPGraphQL`,
        // This is field under which it's accessible
        fieldName: `wpgraphql`,
        // Url to query from
        url: `${process.env.GATSBY_WORDPRESS_URL_PROTOCOL}://${process.env.GATSBY_WORDPRESS_URL_PATH}/graphql`,
      },
    },
    {
      resolve: `gatsby-wpgraphql-inline-images`,
      options: {
        wordPressUrl: `http://localhost:8001/`,
        uploadsUrl: `http://localhost:8001/wp-content/uploads/`,
        processPostTypes: [`Page`, `Post`],
        graphqlTypeName: `WPGraphQL`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GATSBY_GOOGLE_ANALYTICS,
        head: false,
        anonymize: true,
        respectDNT: true,
        exclude: [`/preview/**`, `/do-not-track/me/too/`],
        pageTransitionDelay: 0,
      },
    },
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-advanced-sitemap`,
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [
          ``,
          `/posts/*`,
          `/post/*`,
          `/tag/*`,
          `/category/*`,
          `/about`,
        ],
      },
    },
  ],
}
