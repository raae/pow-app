import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { navigate } from "gatsby"
import Alert from "@material-ui/lab/Alert"

import { SEO, Loading } from "../features/app"
import PageTemplate from "../templates/page"

import { useAuth, signOut } from "../features/auth"

const SignOutPage = () => {
  const dispatch = useDispatch()

  const { isUnauthenticated, isAuthFailed, error } = useAuth()

  useEffect(() => {
    if (isUnauthenticated) {
      navigate("/")
    } else {
      dispatch(signOut())
    }
  }, [dispatch, isUnauthenticated])

  return (
    <PageTemplate>
      {isAuthFailed ? (
        <>
          <SEO title="Sign out" />
          <h1>Sign out failed</h1>
          <Alert severity="error">{error.message}</Alert>
        </>
      ) : (
        <>
          <SEO title="Signing out..." />
          <Loading fullScreen />
        </>
      )}
    </PageTemplate>
  )
}

export default SignOutPage
