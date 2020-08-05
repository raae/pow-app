import React from "react"
import { MDXProvider } from "@mdx-js/react"

import BrandCopy from "./BrandCopy"
import { Link, ButtonLink } from "../app/Link"
import Logo from "../app/Logo"
import { SignInButton } from "../auth/AuthButtons"
import UserForm from "../auth/UserForm"
import PaymentForm from "../components/PaymentForm"
import Onboarding from "../components/Onboarding"

const components = {
  a: Link,
}

const shortcodes = {
  Logo,
  SignInButton,
  ButtonLink,
  UserForm,
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
