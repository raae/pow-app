import React from "react"

import useBlockstack from "./../store/useBlockstack"
import { Button } from "@material-ui/core"
import { Link } from "gatsby"

const SignInButton = ({ children, ...props }) => {
  const [{ user, isPending }, { signIn }] = useBlockstack()

  if (user) {
    return (
      <Button {...props} component={Link} to="/app">
        {children}
      </Button>
    )
  } else {
    return (
      <Button {...props} to="/app" disabled={isPending} onClick={signIn}>
        {children}
      </Button>
    )
  }
}

export default SignInButton
