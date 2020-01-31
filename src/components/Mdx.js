import React from "react"
import { MDXProvider } from "@mdx-js/react"

import BrandCopy from "../components/BrandCopy"
import { Link, ButtonLink } from "../components/Link"
import Logo from "../components/Logo"
import SignInButton from "../components/SignInButton"
import SubscribeButton from "../components/SubscribeButton"
import StripeButton from "../components/StripeButton"
import AngelsCheckout from "../components/AngelsCheckout"
import AngelDonation from "../components/AngelDonation"

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
  SubscribeButton,
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
