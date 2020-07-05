import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import MainMenu from "./MainMenu"

const Header = ({ pageContext, toggleBackdrop, ...props }) => {
  const { wpgraphql } = useStaticQuery(graphql`
    query {
      wpgraphql {
        generalSettings {
          description
          title
        }
      }
    }
  `)
  return (
    <header id="site-header" className="header-footer-group" role="banner">
      <div className="header-inner section-inner">
        <div className="header-titles-wrapper">
          <div className="header-titles">
            <h1 className="site-title">
              <Link
                to="/"
                dangerouslySetInnerHTML={{
                  __html: wpgraphql.generalSettings.title,
                }}
              />
            </h1>
            <div
              className="site-description"
              dangerouslySetInnerHTML={{
                __html: wpgraphql.generalSettings.description,
              }}
            />
          </div>
        </div>

        <div className="header-navigation-wrapper">
          <MainMenu />
        </div>
      </div>
    </header>
  )
}

export default Header
