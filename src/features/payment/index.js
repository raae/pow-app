import React from "react"
import { useSelector } from "react-redux"

import { selectHasOldActiveSubscription } from "../auth"

import NewPaymentForm from "./PaymentForm"
import OldPaymentForm from "./OldPaymentForm"

export const PaymentForm = (props) => {
  const hasOldActiveSubscription = useSelector(selectHasOldActiveSubscription)

  if (hasOldActiveSubscription) {
    return <OldPaymentForm {...props} />
  } else {
    return <NewPaymentForm {...props} />
  }
}
