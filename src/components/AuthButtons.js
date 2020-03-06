import React from "react"

import { Button } from "@material-ui/core"

import { useSignUpAction, useSignInAction } from "./navItems"

export const SignInButton = ({ children, ...props }) => {
  const actionItem = useSignInAction()

  return (
    <Button {...actionItem} {...props}>
      {children ? children : actionItem.label}
    </Button>
  )
}

export const SignUpButton = ({ children, ...props }) => {
  const actionItem = useSignUpAction()

  return (
    <Button {...actionItem} {...props}>
      {children ? children : actionItem.label}
    </Button>
  )
}
