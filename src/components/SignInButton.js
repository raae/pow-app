import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectUser, selectAuthIsPending, signIn } from "../store/auth"

import { Button } from "@material-ui/core"
import { Link } from "gatsby"

const SignInButton = ({ children, ...props }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const isPending = useSelector(selectAuthIsPending)

  if (user) {
    return (
      <Button component={Link} to="/app" {...props}>
        {children}
      </Button>
    )
  } else {
    return (
      <Button
        disabled={isPending}
        onClick={() => dispatch(signIn())}
        {...props}
      >
        {children}
      </Button>
    )
  }
}

export default SignInButton
