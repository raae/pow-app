import React, { useEffect } from "react"
import { navigate } from "gatsby"

import { Loading, SEO } from "../features/app"
import { useSignInNavItem } from "../features/navigation"

const IndexPage = () => {
  const signInNavItem = useSignInNavItem()

  useEffect(() => {
    navigate(signInNavItem.to)
  }, [signInNavItem.to])

  return (
    <>
      <SEO title="Loading..." />
      <Loading fullScreen />
    </>
  )
}

export default IndexPage
