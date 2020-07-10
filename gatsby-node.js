/* eslint-disable no-unused-vars */
const path = require(`path`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const GET_POSTS = `
    query GET_POSTS($first:Int $after:String){
      wpgraphql {
        posts(
          first: $first 
          after: $after
          where: {status: PUBLISH}
        ) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            databaseId
            uri
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
    }
  `

  const blogPagesResults = async ({
    first,
    after,
    pageNumber,
    blogPages,
    postResults,
  }) =>
    await graphql(GET_POSTS, { first, after }).then(({ data }) => {
      const {
        wpgraphql: {
          posts: {
            nodes,
            pageInfo: { hasNextPage, endCursor },
          },
        },
      } = data

      const databaseIds = nodes.map((node) => node.postId)
      const blogTemplate = path.resolve(`./src/templates/blog-template.js`)
      const blogPagePath = !after ? `blog/` : `blog/page/${pageNumber}`

      blogPages[pageNumber] = {
        path: blogPagePath,
        component: blogTemplate,
        context: {
          databaseIds,
          pageNumber,
          hasNextPage,
        },
        databaseIds,
      }

      nodes.map((post) => {
        postResults.push(post)
      })

      if (hasNextPage) {
        pageNumber = pageNumber + 1
        return blogPagesResults({
          first: 12,
          after: endCursor,
          pageNumber,
          blogPages,
          postResults,
        })
      }
      return { blogPages, postResults }
    })

  const { blogPages, postResults } = await blogPagesResults({
    first: 12,
    after: ``,
    pageNumber: 0,
    blogPages: [],
    postResults: [],
  })

  blogPages.map((blogPage) => {
    console.log(`blogPage: ${blogPage.path}`)
    createPage(blogPage)
  })

  postResults.map((node) => {
    console.log(`post: ${node.uri}`)

    createPage({
      path: node.uri,
      component: path.resolve(`./src/templates/post-template.js`),
      context: {
        // This is the $slug variable
        // passed to blog-post.js
        slug: node.uri,
        databaseId: node.databaseId,
      },
    })
  })

  /**
   * Create Pages
   */
  const pageResults = await graphql(`
    query GET_PAGES {
      wpgraphql {
        pages(where: { status: PUBLISH }) {
          edges {
            node {
              databaseId
              slug
              uri
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
      }
    }
  `)

  pageResults.data.wpgraphql.pages.edges.forEach(({ node }) => {
    console.log(`page: ${node.slug}`)

    if (node.uri === `/`) {
      return
    }

    createPage({
      path: node.uri,
      component: path.resolve(`./src/templates/page-template.js`),
      context: {
        // This is the $slug variable
        // passed to blog-post.js
        slug: node.uri,
        databaseId: node.databaseId,
      },
    })
  })

  /**
   * Create Category Pages
   */
  const categoryPageResults = await graphql(`
    query GET_CATEGORY_PAGES {
      wpgraphql {
        categories(first: 1000) {
          edges {
            node {
              databaseId
              name
              slug
              uri
            }
          }
        }
      }
    }
  `)

  categoryPageResults.data.wpgraphql.categories.edges.forEach(({ node }) => {
    console.log(node)
    createPage({
      path: `${node.uri}`,
      component: path.resolve(`./src/templates/category-page-template.js`),
      context: {
        // This is the $slug variable
        // passed to blog-post.js
        slug: node.uri,
        databaseId: node.databaseId,
        name: node.name,
      },
    })
  })

  /**
   * Create Tags Pages
   */
  const tagPageResults = await graphql(`
    query GET_CATEGORY_PAGES {
      wpgraphql {
        tags(first: 1000) {
          edges {
            node {
              databaseId
              name
              slug
              uri
            }
          }
        }
      }
    }
  `)

  tagPageResults.data.wpgraphql.tags.edges.forEach(({ node }) => {
    createPage({
      path: `${node.uri}`,
      component: path.resolve(`./src/templates/tag-page-template.js`),
      context: {
        // This is the $slug variable
        // passed to blog-post.js
        slug: node.uri,
        databaseId: node.databaseId,
        name: node.name,
      },
    })
  })
}

// Create Cached Image files
// https://thoughtsandstuff.com/gatsby-with-wordpress-caching-downloaded-media-images-to-reduce-build-time/
exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  getNode,
  store,
  reporter,
}) => {
  const { createNode, touchNode } = actions

  // Add all media libary images so they can be queried by
  // childImageSharp
  createResolvers({
    WPGraphQL_MediaItem: {
      imageFile: {
        type: `File`,
        async resolve(source, args, context, info) {
          if (source.sourceUrl) {
            let fileNodeID
            let fileNode
            let sourceModified

            // Set the file cacheID, get it (if it has already been set)
            const mediaDataCacheKey = `wordpress-media-${source.mediaItemId}`
            const cacheMediaData = await cache.get(mediaDataCacheKey)

            if (source.modified) {
              sourceModified = source.modified
            }

            // If we have cached media data and it wasn't modified, reuse
            // previously created file node to not try to redownload
            if (cacheMediaData && sourceModified === cacheMediaData.modified) {
              fileNode = getNode(cacheMediaData.fileNodeID)

              // check if node still exists in cache
              // it could be removed if image was made private
              if (fileNode) {
                fileNodeID = cacheMediaData.fileNodeID
                // https://www.gatsbyjs.org/docs/node-creation/#freshstale-nodes
                touchNode({
                  nodeId: fileNodeID,
                })
              }
            }

            // If we don't have cached data, download the file
            if (!fileNodeID) {
              try {
                // Get the filenode
                fileNode = await createRemoteFileNode({
                  url: source.sourceUrl,
                  store,
                  cache,
                  createNode,
                  createNodeId,
                  reporter,
                })

                if (fileNode) {
                  fileNodeID = fileNode.id

                  await cache.set(mediaDataCacheKey, {
                    fileNodeID,
                    modified: sourceModified,
                  })
                }
              } catch (e) {
                // Ignore
                console.log(e)
                return null
              }
            }

            if (fileNode) {
              return fileNode
            }
          }
          return null
        },
      },
    },
  })
}
