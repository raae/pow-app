import React from "react"
import { Link } from "gatsby"

import useBlockstack from "./../store/useBlockstack"
import Layout from "./../components/Layout"
import Mdx from "./../components/Mdx"
import BrandButton from "../components/BrandButton"

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

  let homeItem = <BrandButton></BrandButton>

  if (location.pathname === "/") {
    homeItem = null
  }

  const authItem = user ? signedInItem : signedOutItem

  const footer = (
    <>
      Made with ❤ by <a href="https://raae.codes">@raae</a> and family.
    </>
  )

  return (
    <Layout homeItem={homeItem} navItems={[authItem]} footer={footer}>
      <Mdx>{children}</Mdx>
    </Layout>
  )
}

export default PublicTemplate
