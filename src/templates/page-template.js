import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import contentParser from "gatsby-wpgraphql-inline-images"
import Img from "gatsby-image"

const SecondPage = ({ data }) => {
  const content = data.wpgraphql.page.content
  const pluginOptions = {
    wordPressUrl: `http://localhost:8001/`,
    uploadsUrl: `http://localhost:8001/wp-content/uploads/`,
  }

  return (
    <div>
      {data.wpgraphql.page.featuredImage && (
        <Img
          fluid={
            data.wpgraphql.page.featuredImage.node.imageFile.childImageSharp
              .fluid
          }
          alt={data.wpgraphql.page.title}
        />
      )}

      <h1 dangerouslySetInnerHTML={{ __html: data.wpgraphql.page.title }} />

      <div className="content-container">
        {contentParser({ content }, pluginOptions)}
      </div>

      <Link to="/">Go back to the homepage</Link>
    </div>
  )
}

export default SecondPage

export const query = graphql`
  query($databaseId: ID!) {
    wpgraphql {
      page(id: $databaseId, idType: DATABASE_ID) {
        title
        date
        content
        uri
        featuredImage {
          node {
            altText
            title(format: RENDERED)
            mediaItemUrl
            slug
            imageFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`
