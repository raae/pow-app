import React from "react"
import { Link } from "gatsby"

import SEO from "../components/Seo"
import useBlockstack from "../store/useBlockstack"
import Mdx from "../components/Mdx"
import Layout from "../components/BrandLayout"
import Button from "../components/BrandButton"
import Footer from "../components/BrandFooter"

const PageTemplate = ({ children, location }) => {
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
    <>
      <SEO />
      <Layout homeItem={homeItem} navItems={[authItem]} footer={<Footer />}>
        <Mdx>{children}</Mdx>
      </Layout>
    </>
  )
}

export default PageTemplate
