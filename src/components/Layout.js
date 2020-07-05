import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import Body from "./Body"
import Wrapper from "./Wrapper"
import Main from "./Main"
import "twin.macro"

const Layout = ({ children }) => (
  <Body id={`GatsbyBody`}>
    <Wrapper id="wrapper">
      <Header />

      <Main id="site-content" role="main">
        {children}
      </Main>

      <Footer />
    </Wrapper>
  </Body>
)

export default Layout
