/* eslint-disable no-invalid-this */
import React, { Component } from "react"
import { graphql, navigate, Link } from "gatsby"

class IndexPage extends Component {
  renderPreviousLink = () => {
    const {
      pageContext: { pageNumber },
    } = this.props

    let previousLink = null

    if (!pageNumber) {
      return null
    } else if (1 === pageNumber) {
      previousLink = `/`
    } else if (1 < pageNumber) {
      previousLink = `/page/${pageNumber - 1}`
    }

    return (
      <button onClick={() => navigate(previousLink)}>Previous Posts</button>
    )
  }

  renderNextLink = () => {
    const {
      pageContext: { hasNextPage, pageNumber },
    } = this.props

    if (hasNextPage) {
      return (
        <button onClick={() => navigate(`/page/${pageNumber + 1}`)}>
          Next Posts
        </button>
      )
    } else {
      return null
    }
  }

  render() {
    const {
      data,
      pageContext: { pageNumber },
    } = this.props
    const blogPageNumber = pageNumber ? ` Page ${pageNumber}` : ``
    return (
      <div>
        <header>Page {blogPageNumber}</header>
        <div>
          {data &&
            data.wpgraphql &&
            data.wpgraphql.posts.nodes.map((post) => (
              <div key={post.id}>
                {post.slug}
                <h2>
                  <Link to={`/${post.slug}`}>{post.title}</Link>
                </h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.excerpt,
                  }}
                />
              </div>
            ))}
        </div>
        <div>
          {this.renderPreviousLink()}
          {this.renderNextLink()}
        </div>
      </div>
    )
  }
}

export default IndexPage

export const query = graphql`
  query($databaseId: [ID]) {
    wpgraphql {
      posts(where: { in: $databaseId }) {
        nodes {
          id
          title
          uri
          slug
          date
          excerpt
        }
      }
    }
  }
`
