import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import Section from "./Section"
import SignInButton from "./SignInButton"
import { Link as MaterialLink, Grid } from "@material-ui/core"

const Link = ({ children, ...props }) => {
  const internal = /^\/(?!\/)/.test(props.href)
  if (internal) {
    props.to = props.href
  }

  return (
    <MaterialLink component={internal ? GatsbyLink : null} {...props}>
      {children}
    </MaterialLink>
  )
}

const components = {
  a: Link,
}

const shortcodes = { Section, Grid, SignInButton }

const Mdx = ({ children }) => {
  return (
    <MDXProvider components={{ ...shortcodes, ...components }}>
      {children}
    </MDXProvider>
  )
}

export default Mdx
