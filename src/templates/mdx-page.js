import React from "react"

import { SEO, AppLayout, Mdx } from "../features/app"

const PageTemplate = ({ location, children }) => {
  const variant = location.pathname === "/" ? "home" : ""
  return (
    <AppLayout variant={variant}>
      <SEO />
      <Mdx>{children}</Mdx>
    </AppLayout>
  )
}

export default PageTemplate
