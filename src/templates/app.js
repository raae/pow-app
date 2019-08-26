import React from "react"
import { Link, navigate } from "gatsby"

import useBlockstack from "../store/useBlockstack"
import Layout from "../components/AppLayout"

const AppTemplate = ({ children, appBarItems }) => {
  const [{ isPending, user }] = useBlockstack()

  if (!user && !isPending) {
    navigate("/")
  }

  if (!user) {
    return null
  }

  return <Layout appBarItems={appBarItems}>{children}</Layout>
}

export default AppTemplate
