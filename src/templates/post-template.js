import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import contentParser from "gatsby-wpgraphql-inline-images"

const SecondPage = ({ data }) => {
  const content = data.wpgraphql.post.content
  const pluginOptions = {
    wordPressUrl: `http://localhost:8001/`,
    uploadsUrl: `http://localhost:8001/wp-content/uploads/`,
  }

  return (
    <div>
      <div className="blog-template">
        {data.wpgraphql.post.featuredImage && (
          <Img
            fluid={
              data.wpgraphql.post.featuredImage.node.imageFile.childImageSharp
                .fluid
            }
            alt={data.wpgraphql.post.title}
          />
        )}

        <h1 dangerouslySetInnerHTML={{ __html: data.wpgraphql.post.title }} />

        <div className="content-container">
          {contentParser({ content }, pluginOptions)}
        </div>
      </div>

      <Link to="/">Go back to the homepage</Link>
    </div>
  )
}

export default SecondPage

export const query = graphql`
  query($databaseId: ID!) {
    wpgraphql {
      post(id: $databaseId, idType: DATABASE_ID) {
        title
        date
        uri
        content
        categories {
          edges {
            node {
              name
            }
          }
        }
        excerpt(format: RENDERED)
        featuredImage {
          node {
            altText
            title(format: RENDERED)
            mediaItemUrl
            slug
            sourceUrl
            mediaItemId
            modified
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
