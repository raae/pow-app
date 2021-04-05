import React from "react"
import { useSelector } from "react-redux"
import { Typography } from "@material-ui/core"

import { Link } from "../navigation"
import { selectSubscriptionPlanId } from "../auth"

const OldPaymentForm = () => {
  const subscriptionPlanId = useSelector(selectSubscriptionPlanId)

  let label = "subscriptionPlanId"
  if (subscriptionPlanId.includes("monthly")) {
    label = "monthly"
  } else if (subscriptionPlanId.includes("yearly")) {
    label = "yearly"
  }

  return (
    <>
      <Typography variant="body1">
        You are subscribed to the <strong>{label}</strong> plan.
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        If you would like to cancel your subscription or change it, send an
        e-mail to{" "}
        <Link href="mailto://support@usepow.app">support@usepow.app</Link>.
      </Typography>
    </>
  )
}

export default OldPaymentForm
