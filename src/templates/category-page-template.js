import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

const SecondPage = ({ data }) => (
  <div>
    <h1 dangerouslySetInnerHTML={{ __html: data.wpgraphql.category.name }} />

    {data.wpgraphql.category.posts.edges.map(({ node }) => (
      <div key={node.uri}>
        <Link to={`${node.uri}`}>
          <div dangerouslySetInnerHTML={{ __html: node.title }} />
        </Link>
        <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
      </div>
    ))}

    <Link to="/">Go back to the homepage</Link>
  </div>
)

export default SecondPage

export const query = graphql`
  query($databaseId: ID!) {
    wpgraphql {
      category(id: $databaseId, idType: DATABASE_ID) {
        name
        posts {
          edges {
            node {
              slug
              uri
              databaseId
              title
              excerpt
            }
          }
        }
      }
    }
  }
`
