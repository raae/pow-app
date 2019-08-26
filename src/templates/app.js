import React from "react"
import { Link, navigate } from "gatsby"

import useBlockstack from "../store/useBlockstack"
import Layout from "./../components/Layout"

const AppTemplate = ({ children, navItems }) => {
  const [{ isPending, user }] = useBlockstack()

  if (!user && !isPending) {
    navigate("/")
  }

  if (!user) {
    return null
  }

  const footer = (
    <>
      Back to the app's <Link to="/">website</Link>.<br />
      Made with ❤ by <a href="https://raae.codes">@raae</a>.
    </>
  )

  return (
    <Layout navItems={navItems} footer={footer}>
      {children}
    </Layout>
  )
}

export default AppTemplate
