import React from "react"

import { Link as GatsbyLink } from "gatsby"
import {
  Link as MaterialLink,
  Button as MaterialButton,
} from "@material-ui/core"

const isInternal = (url) => /^\/(?!\/)/.test(url)

const prepareProps = (props) => {
  const url = props.href || props.to
  const internal = isInternal(url)

  if (internal) {
    props.to = url
  } else {
    props.href = url
  }

  return {
    ...props,
    component: !internal ? MaterialLink : GatsbyLink,
  }
}

export const Link = ({ children, label, ...props }) => {
  props = prepareProps(props)

  return <MaterialLink {...props}>{children || label}</MaterialLink>
}

export const ButtonLink = ({ children, label, ...props }) => {
  props = prepareProps(props)

  return <MaterialButton {...props}>{children || label}</MaterialButton>
}
