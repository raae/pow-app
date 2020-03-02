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
      to={sendToApp ? "/day" : "/login"}
      {...props}
    >
      {children}
    </Button>
  )
}

export const SignOutButton = ({ children = "Log out", ...props }) => {
  const { signOut, isPending } = useAuthActions()

  return (
    <Button onClick={signOut} disable={isPending} {...props}>
      {children}
    </Button>
  )
}
