import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { navigate } from "gatsby"
import Alert from "@material-ui/lab/Alert"

import SEO from "../components/Seo"
import Loading from "../components/Loading"
import BrandLayout from "../components/BrandLayout"

import {
  selectAuthUser,
  selectAuthIsPending,
  selectAuthError,
  signOut,
} from "../auth/slice"

const SignOutPage = () => {
  const dispatch = useDispatch()

  const user = useSelector(selectAuthUser)
  const isPending = useSelector(selectAuthIsPending)
  const error = useSelector(selectAuthError)

  useEffect(() => {
    if (user && !isPending) {
      dispatch(signOut())
    }
    if (!user) {
      navigate("/")
    }
  }, [dispatch, isPending, user])

  if (!error) {
    return (
      <>
        <SEO title="Signing out..." />
        <Loading fullScreen />
      </>
    )
  } else {
    return (
      <>
        <BrandLayout variant="app">
          <h1>Sign out failed</h1>
          <Alert severity="error">{error.message}</Alert>
        </BrandLayout>
      </>
    )
  }
}

export default SignOutPage
