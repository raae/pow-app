import React from "react"

import BrandLayout from "../brand/BrandLayout"
import SEO from "../app/Seo"
import Mdx from "../brand/Mdx"

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
