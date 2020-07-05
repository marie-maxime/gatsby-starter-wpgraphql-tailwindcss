import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/Layout"
import Seo from "../components/Seo"

const IndexPage = ({ data }) => (
  <Layout>
    <Seo />
    <h1>
      Hey yall!
      <span role="img" aria-label="waving hello">
        👋
      </span>
    </h1>
    <div className="introduction box-wrapper-first">
      <div className="box">
        <p>
          Fill out an intro to yourself here... Put your picture on the right!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
          tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrum exercitationem ullam corporis suscipit
          laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
    <br />
    <hr />
    <br />
    <div className="box-wrapper-first">
      <div className="box box-posts">
        <h2>
          Latest Posts{` `}
          <span role="img" aria-label="writing hand">
            ✍️
          </span>
        </h2>
        {data.wpgraphql.blogs.edges.map(({ node }) => (
          <div key={node.id}>
            <Link className="blog-link" to={`${node.uri}`}>
              {null !== node.featuredImage && node.featuredImage.node && (
                <Img
                  className="blog-image"
                  fixed={
                    node.featuredImage.node.imageFile.childImageSharp.fixed
                  }
                  alt={node.title}
                />
              )}
              <div dangerouslySetInnerHTML={{ __html: node.title }} />
            </Link>
          </div>
        ))}
        <br />
        <Link to={`/blog`}>See all Blog Posts...</Link>
      </div>
      <div className="box box-talks">
        <h2>
          Un-Cat
          <span role="img" aria-label="uncategorized">
            🙀
          </span>
        </h2>
        <ul>
          {data.wpgraphql.uncategorized.edges.map(({ node }) => (
            <li key={node.id}>
              <Link
                to={`${node.uri}`}
                dangerouslySetInnerHTML={{ __html: node.title }}
              ></Link>
            </li>
          ))}
        </ul>
        <br />
        <Link to={`/category/uncategorized`}>See all uncategorized...</Link>
      </div>
    </div>

    <br />
    <br />
    <hr />
    <br />
    <br />

    <h2>Categories</h2>
    {data.wpgraphql.categories.edges.map(({ node }) => (
      <div key={node.id}>
        <Link to={`${node.uri}`}>
          <div dangerouslySetInnerHTML={{ __html: node.name }} />
        </Link>
      </div>
    ))}
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query GET_MAIN_PAGE {
    wpgraphql {
      blogs: posts(first: 6, after: null) {
        edges {
          node {
            databaseId
            id
            slug
            uri
            title
            date
            excerpt
            content(format: RENDERED)
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
                    fixed(width: 50) {
                      tracedSVG
                      width
                      height
                      src
                      srcSet
                    }
                  }
                }
              }
            }
          }
        }
      }
      uncategorized: posts(
        first: 6
        after: null
        where: { categoryName: "uncategorized" }
      ) {
        edges {
          node {
            databaseId
            slug
            uri
            id
            title
            date
            content(format: RENDERED)
            featuredImage {
              node {
                altText
                link
                mediaItemUrl
                uri
              }
            }
          }
        }
      }
      categories(first: 1000) {
        edges {
          node {
            databaseId
            id
            name
            slug
          }
        }
      }
    }
  }
`
