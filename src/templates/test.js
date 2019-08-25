import React from "react"
import { Link, navigate } from "gatsby"

import useBlockstack from "./../store/useBlockstack"
import Layout from "./../components/Layout"

const TestTemplate = ({ children, navItems }) => {
  const [{ isPending, user }] = useBlockstack()

  if (user) {
    console.log("Test user", user, isPending)
    navigate("/app")
    return null
  }

  const homeItem = {
    label: "POW!",
    component: Link,
    to: "/test",
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

export default TestTemplate
