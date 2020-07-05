import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"

const MENU_QUERY = graphql`
  fragment MenuFields on WPGraphQL_MenuItem {
    id
    label
    url
    path
    connectedObject {
      __typename
    }
  }

  query GET_MENU_ITEMS {
    wpgraphql {
      menuItems(where: { location: PRIMARY }) {
        nodes {
          ...MenuFields
          childItems {
            nodes {
              ...MenuFields
              childItems {
                nodes {
                  ...MenuFields
                  childItems {
                    nodes {
                      ...MenuFields
                      childItems {
                        nodes {
                          ...MenuFields
                          childItems {
                            nodes {
                              ...MenuFields
                              childItems {
                                nodes {
                                  ...MenuFields
                                  childItems {
                                    nodes {
                                      ...MenuFields
                                      childItems {
                                        nodes {
                                          ...MenuFields
                                          childItems {
                                            nodes {
                                              ...MenuFields
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const renderMenuItem = (menuItem) => {
  if (menuItem.childItems && menuItem.childItems.nodes.length) {
    return renderSubMenu(menuItem)
  } else {
    return (
      <li key={menuItem.id}>
        <Link to={menuItem.path}>{menuItem.label}</Link>
      </li>
    )
  }
}

const renderSubMenu = (menuItem) => (
  <ul key={menuItem.id}>
    {menuItem.childItems.nodes.map((item) => renderMenuItem(item))}
  </ul>
)

const SiteMenu = ({ location }) => (
  <StaticQuery
    query={MENU_QUERY}
    render={(data) => {
      if (data.wpgraphql.menuItems) {
        return (
          <nav>
            <ul>
              {data.wpgraphql.menuItems.nodes.map((menuItem) => {
                if (menuItem.childItems.nodes.length) {
                  return renderSubMenu(menuItem)
                } else {
                  return renderMenuItem(menuItem)
                }
              })}
            </ul>
          </nav>
        )
      } else {
        return null
      }
    }}
  />
)

export default SiteMenu
