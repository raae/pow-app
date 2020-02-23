import React from "react"
import { Link as GatsbyLink, navigate } from "gatsby"

import { Button } from "@material-ui/core"
import { useAuthState, useAuthActions } from "../auth"

export const SignInButton = ({ children = "Log in", ...props }) => {
  const { user } = useAuthState()
  return (
    <Button component={GatsbyLink} to={user ? "/app" : "/login"} {...props}>
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
