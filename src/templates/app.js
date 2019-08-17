import React from "react"
import { Link, navigate } from "gatsby"

import useBlockstack from "../hooks/useBlockstack"
import Layout from "./../components/Layout"

const AppTemplate = ({ children, navItems }) => {
  const { isPending, isAuthenticated } = useBlockstack()

  if (!isAuthenticated && !isPending) {
    navigate("/")
  }

  if (!isAuthenticated) {
    return null
  }

  const homeItem = {
    label: "POW!",
    component: Link,
    to: "/app",
  }

  const footer = (
    <>
      Back to the app's <Link to="/">website</Link>.<br />
      Made with ❤ by <a href="https://raae.codes">@raae</a>.
    </>
  )

  return (
    <Layout homeItem={homeItem} navItems={navItems} footer={footer}>
      {children}
    </Layout>
  )
}

export default AppTemplate
