import React from "react"
import { navigate } from "gatsby"

import useBlockstack from "../store/useBlockstack"
import Layout from "../components/AppLayout"

const AppTemplate = ({ children, appBarItems, aside }) => {
  const [{ isPending, user }] = useBlockstack()

  if (!user && !isPending) {
    navigate("/")
  }

  if (!user) {
    return null
  }

  return (
    <Layout appBarItems={appBarItems} aside={aside}>
      {children}
    </Layout>
  )
}

export default AppTemplate
