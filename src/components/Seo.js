import React from "react"
import { Helmet } from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

const Seo = ({ description, lang, title }) => (
  <StaticQuery
    query={detailsQuery}
    render={({ site }) => {
      const { siteMetadata } = site
      const metaDescription = description || siteMetadata.description || ``
      const titleText = title || siteMetadata.title || ``
      return (
        <Helmet
          htmlAttributes={{
            lang: `en`,
          }}
          title={titleText}
          titleTemplate={`%s | ${siteMetadata.title}`}
          meta={[
            {
              name: `description`,
              content: metaDescription,
            },
            {
              property: `og:title`,
              content: title,
            },
            {
              property: `og:description`,
              content: metaDescription,
            },
            {
              property: `og:type`,
              content: `website`,
            },
            {
              name: `twitter:card`,
              content: `summary`,
            },
            {
              name: `twitter:creator`,
              content: siteMetadata.social.twitter,
            },
            {
              name: `twitter:title`,
              content: title,
            },
            {
              name: `twitter:description`,
              content: metaDescription,
            },
          ]}
        />
      )
    }}
  />
)

const detailsQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Seo
