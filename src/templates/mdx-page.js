import React from "react"

import { SEO } from "../features/app"
import BrandLayout from "../features/brand/BrandLayout"
import Mdx from "../features/brand/Mdx"

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
