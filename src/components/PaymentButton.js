import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectUser, selectAuthIsPending } from "../store/auth"
import { purchaseSubscription } from "../store/subscription"

import { Button } from "@material-ui/core"
import SignInButton from "./SignInButton"

const PaymentButton = ({ children, variant, ...props }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const isPending = useSelector(selectAuthIsPending)

  if (user) {
    return (
      <Button
        disabled={isPending}
        onClick={() => dispatch(purchaseSubscription({ variant }))}
        {...props}
      >
        {children}
      </Button>
    )
  } else {
    return <SignInButton {...props}>{children}</SignInButton>
  }
}

export default PaymentButton
