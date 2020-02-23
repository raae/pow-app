import React from "react"
import { Link as GatsbyLink } from "gatsby"

import { Button } from "@material-ui/core"
import { useAuthState } from "../auth"

const SignInButton = ({ children, ...props }) => {
  const { user } = useAuthState()
  return (
    <Button component={GatsbyLink} to={user ? "/app" : "/login"} {...props}>
      {children}
    </Button>
  )
}

export default SignInButton
