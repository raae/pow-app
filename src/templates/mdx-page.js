import React from "react"

import { SEO } from "../features/app"
import { BrandLayout, Mdx } from "../features/brand"

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
