import React from "react"
import { Link } from "gatsby"

import useAuth from "./../hooks/useAuth"
import Layout from "./../components/Layout"

const AppTemplate = ({ children, navItems }) => {
  const { isAuthenticated, isPending } = useAuth({
    force: true,
  })

  if (!isAuthenticated && !isPending) return null

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
