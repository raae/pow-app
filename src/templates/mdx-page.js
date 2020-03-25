import React from "react"

import BrandLayout from "../components/BrandLayout"
import SEO from "../components/Seo"
import Mdx from "../components/Mdx"

const PageTemplate = ({ location, children }) => {
  const variant = location.pathname === "/" ? "home" : ""
  return (
    <BrandLayout variant={variant}>
      <SEO />
      <Mdx>{children}</Mdx>
    </BrandLayout>
  )
}

export default PageTemplate
