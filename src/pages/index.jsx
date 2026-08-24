import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { Loading, Seo } from "../features/app"
import { TIMELINE } from "../features/navigation"
import { useAuth } from "../features/auth"

const IndexPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(TIMELINE.to)
    }
  }, [isAuthenticated, navigate])

  return (
    <>
      <Seo title="Loading..." />
      <Loading fullScreen />
    </>
  )
}

export default IndexPage
