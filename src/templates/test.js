import React from "react"
import { Link } from "gatsby"

import Layout from "./../components/Layout"

const TestTemplate = ({ children }) => {
  const homeItem = {
    label: "POW!",
    component: Link,
    to: "/app",
  }

  const footer = (
    <>
      Made with ❤ by <a href="https://raae.codes">@raae</a>.
    </>
  )

  return (
    <Layout homeItem={homeItem} navItems={[]} footer={footer}>
      {children}
    </Layout>
  )
}

export default TestTemplate
