import React from "react"
import { MDXProvider } from "@mdx-js/react"

import BrandCopy from "../components/BrandCopy"
import { Link, ButtonLink } from "../components/Link"
import Logo from "../components/Logo"
import { SignInButton } from "../components/AuthButtons"
import UserForm from "../components/UserForm"
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
