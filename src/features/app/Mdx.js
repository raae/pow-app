import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { Button } from "@material-ui/core"

import AppCopy from "./AppCopy"
import { Link, ButtonLink } from "../navigation"

import { SignInForm } from "../auth"
import { useSignInNavItem } from "../navigation"
import { PaymentForm } from "../payment"
import { Onboarding } from "../onboarding"

import Logo from "./Logo"

const SignInButton = (props) => {
  const signInNavItem = useSignInNavItem()
  return <Button {...signInNavItem} {...props} />
}

const components = {
  a: Link,
}

const shortcodes = {
  Logo,
  SignInButton,
  ButtonLink,
  SignInForm,
  Onboarding,
  PaymentForm,
}

const Mdx = ({ children }) => {
  return (
    <AppCopy>
      <MDXProvider components={{ ...components, ...shortcodes }}>
        {children}
      </MDXProvider>
    </AppCopy>
  )
}

export default Mdx
