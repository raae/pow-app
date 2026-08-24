import React, { useEffect } from "react"
import Alert from "@material-ui/lab/Alert"

import { Seo, Loading } from "../features/app"
import PageTemplate from "../templates/page"

import { useAuth } from "../features/auth"

const SignOutPage = () => {
  const { isAuthFailed, error, signOut } = useAuth()

  useEffect(() => {
    signOut()
  }, [signOut])

  return (
    <PageTemplate>
      {isAuthFailed ? (
        <>
          <Seo title="Sign out" />
          <h1>Sign out failed</h1>
          <Alert severity="error">{error.message}</Alert>
        </>
      ) : (
        <>
          <Seo title="Signing out..." />
          <Loading fullScreen />
        </>
      )}
    </PageTemplate>
  )
}

export default SignOutPage
