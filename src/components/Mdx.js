import React from "react"
import { MDXProvider } from "@mdx-js/react"

import BrandCopy from "../components/BrandCopy"
import { Link, ButtonLink } from "../components/Link"
import Logo from "../components/Logo"
import SignInButton from "../components/SignInButton"
import StripeButton from "../components/StripeButton"
import AngelsCheckout from "../components/AngelsCheckout"
import AngelDonation from "../components/AngelDonation"
import Onboarding from "../components/Onboarding"

const components = {
  a: Link,
}

const shortcodes = {
  Logo,
  SignInButton,
  StripeButton,
  ButtonLink,
  AngelsCheckout,
  AngelDonation,
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
