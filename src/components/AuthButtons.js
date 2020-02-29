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
  const { signOut } = useAuthActions()

  const handleSignOut = () => {
    signOut()
    navigate("/")
  }

  return (
    <Button onClick={handleSignOut} {...props}>
      {children}
    </Button>
  )
}
