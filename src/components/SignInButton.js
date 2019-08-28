import React from "react"

import useBlockstack from "./../store/useBlockstack"
import { Button } from "@material-ui/core"
import { Link } from "gatsby"

const SignInButton = ({ children, ...props }) => {
  const [{ user, isPending }, { signIn }] = useBlockstack()

  if (user) {
    return (
      <Button component={Link} to="/app" {...props}>
        {children}
      </Button>
    )
  } else {
    return (
      <Button disabled={isPending} onClick={signIn} {...props}>
        {children}
      </Button>
    )
  }
}

export default SignInButton
