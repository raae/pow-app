import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { Button } from "@material-ui/core"

import BrandCopy from "./BrandCopy"
import { Link, ButtonLink } from "../navigation"
import { Logo } from "../brand"

import { SignInForm } from "../auth"
import { useSignInNavItem } from "../navigation"
import PaymentForm from "../payment/PaymentForm"
import Onboarding from "../onboarding/Onboarding"

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
    <BrandCopy>
      <MDXProvider components={{ ...components, ...shortcodes }}>
        {children}
      </MDXProvider>
    </BrandCopy>
  )
}

export default Mdx
