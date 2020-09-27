import React from "react"

import { Mdx } from "../features/app"

import PageTemplate from "./page"

const MdxPageTemplate = ({ children }) => {
  return (
    <PageTemplate>
      <Mdx>{children}</Mdx>
    </PageTemplate>
  )
}

export default MdxPageTemplate
