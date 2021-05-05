import React, { useEffect } from "react"
import { navigate } from "gatsby"

import { Loading, SEO } from "../features/app"
import { TIMELINE } from "../features/navigation"
import { useAuth } from "../features/auth"

const IndexPage = () => {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(TIMELINE.to)
    }
  }, [isAuthenticated])

  return (
    <>
      <SEO title="Loading..." />
      <Loading fullScreen />
    </>
  )
}

export default IndexPage
