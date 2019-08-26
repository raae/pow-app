import React from "react"
import { Link } from "gatsby"

import useBlockstack from "./../store/useBlockstack"
import Mdx from "./../components/Mdx"
import Layout from "./../components/BrandLayout"
import Button from "../components/BrandButton"
import Footer from "../components/BrandFooter"

const PublicTemplate = ({ children, location }) => {
  const [{ user, isPending }, { signIn }] = useBlockstack()

  const signedOutItem = {
    label: "Sign In",
    disabled: isPending,
    variant: "outlined",
    onClick: signIn,
  }

  const signedInItem = {
    label: "Go to app",
    variant: "outlined",
    component: Link,
    to: "/app",
  }

  let homeItem = <Button></Button>

  if (location.pathname === "/") {
    homeItem = null
  }

  const authItem = user ? signedInItem : signedOutItem

  return (
    <Layout homeItem={homeItem} navItems={[authItem]} footer={<Footer />}>
      <Mdx>{children}</Mdx>
    </Layout>
  )
}

export default PublicTemplate
