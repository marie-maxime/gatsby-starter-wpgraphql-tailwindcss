import React from "react"
import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ children }) => (
  <div id={`GatsbyBody`}>
    <Header />

    <main id="site-content" role="main">
      {children}
    </main>

    <Footer />
  </div>
)

export default Layout
