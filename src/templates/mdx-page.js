import React from "react"

import BrandLayout from "../components/BrandLayout"
import SEO from "../components/Seo"
import Mdx from "../components/Mdx"

const PageTemplate = ({ location, children }) => {
  return (
    <BrandLayout isHome={location.pathname === "/"}>
      <SEO />
      <Mdx>{children}</Mdx>
    </BrandLayout>
  )
}

export default PageTemplate
