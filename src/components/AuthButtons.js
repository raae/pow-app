import React from "react"
import { Link as GatsbyLink, navigate } from "gatsby"

import { Button } from "@material-ui/core"
import { useAuthState, useAuthActions } from "../auth"

export const SignInButton = ({ children = "Log in", ...props }) => {
  const { user, isPending } = useAuthState()
  const sendToApp = user || isPending

  return (
    <Button
      component={GatsbyLink}
      to={sendToApp ? "/app" : "/login"}
      {...props}
    >
      {children}
    </Button>
  )
}

export const SignOutButton = ({ children = "Log out", ...props }) => {
  const { signOut, isPending } = useAuthActions()

  const handleSignOut = async () => {
    const result = await signOut()
    if (!result.error) {
      navigate("/login")
    }
  }

  return (
    <Button onClick={handleSignOut} disable={isPending} {...props}>
      {children}
    </Button>
  )
}
