import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectUser, selectAuthIsPending } from "../store/auth"
import {
  purchaseSubscription,
  selectSubscriptionIsPending,
} from "../store/subscription"

import { Button } from "@material-ui/core"
import SignInButton from "./SignInButton"

const SubscribeButton = ({ children, variant, ...props }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const isAuthPending = useSelector(selectAuthIsPending)
  const isSubscriptionPending = useSelector(selectSubscriptionIsPending)

  if (user) {
    return (
      <Button
        disabled={isAuthPending || isSubscriptionPending}
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

export default SubscribeButton
