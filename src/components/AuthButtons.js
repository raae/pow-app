import React from "react"

import { Button } from "@material-ui/core"

import { useSignUpNavItem, useSignInNavItem } from "./navItems"

export const SignInButton = ({ children, ...props }) => {
  const navItem = useSignInNavItem()

  return (
    <Button {...navItem} {...props}>
      {children ? children : navItem.label}
    </Button>
  )
}

export const SignUpButton = ({ children, ...props }) => {
  const navItem = useSignUpNavItem()

  return (
    <Button {...navItem} {...props}>
      {children ? children : navItem.label}
    </Button>
  )
}
