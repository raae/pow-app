import React from "react"
import { MDXProvider } from "@mdx-js/react"

import BrandCopy from "../components/BrandCopy"
import { Link, ButtonLink } from "../components/Link"
import Logo from "../components/Logo"
import SignInButton from "../components/SignInButton"
import AngelsCheckout from "../components/AngelsCheckout"

const components = {
  a: Link,
}

const shortcodes = { Logo, SignInButton, ButtonLink, AngelsCheckout }

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
