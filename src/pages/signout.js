import React, { useEffect } from "react"
import Alert from "@material-ui/lab/Alert"

import { useAuthState, useAuthActions } from "../auth"

import SEO from "../components/Seo"
import Loading from "../components/Loading"
import BrandLayout from "../components/BrandLayout"

const SignOutPage = () => {
  const { isPending, user, error } = useAuthState()
  const { signOut } = useAuthActions()

  useEffect(() => {
    if (user && !isPending) {
      signOut()
    }
  }, [signOut, isPending, user])

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
