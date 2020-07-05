import React from "react"
import SocialNav from "./SocialNav"

const Footer = () => (
  <footer id="site-footer" role="contentinfo" className="header-footer-group">
    <SocialNav />
    <div className="section-inner">
      <div className="footer-credits">
        <p className="footer-copyright">© {new Date().getFullYear()} </p>
      </div>
    </div>
  </footer>
)

export default Footer
