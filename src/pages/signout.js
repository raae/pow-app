import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { navigate } from "gatsby"
import Alert from "@material-ui/lab/Alert"

import { SEO, Loading } from "../features/app"
import BrandLayout from "../features/brand/BrandLayout"

import {
  selectAuthIsPending,
  selectAuthError,
  selectIsAuthenticated,
  signOut,
} from "../features/auth"

const SignOutPage = () => {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector(selectIsAuthenticated)
  const isPending = useSelector(selectAuthIsPending)
  const error = useSelector(selectAuthError)

  useEffect(() => {
    if (isAuthenticated && !isPending) {
      dispatch(signOut())
    }
    if (!isAuthenticated) {
      navigate("/")
    }
  }, [dispatch, isPending, isAuthenticated])

  return (
    <BrandLayout variant="app">
      {error ? (
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
    </BrandLayout>
  )
}

export default SignOutPage
