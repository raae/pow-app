import React from "react"
import { useSelector } from "react-redux"
import classNames from "classnames"
import { Typography, Paper, makeStyles } from "@material-ui/core"

import { STRIPE_MONTHLY_PLAN_ID, STRIPE_YEARLY_PLAN_ID } from "../../constants"
import { Link } from "../navigation"
import { selectSubscriptionPlanId } from "../auth"

const PLAN_LABELS = {
  [STRIPE_MONTHLY_PLAN_ID]: "monthly",
  [STRIPE_YEARLY_PLAN_ID]: "yearly",
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%", // Fix IE 11 issue.
  },
  standalone: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(4),
  },
  space: {
    marginBottom: theme.spacing(2),
  },
  alert: {
    margin: theme.spacing(2, 0),
  },
}))

const OldPaymentForm = ({ standalone = true }) => {
  const classes = useStyles()
  const subscriptionPlanId = useSelector(selectSubscriptionPlanId)

  return (
    <Paper
      component="form"
      className={classNames(classes.root, {
        [classes.standalone]: standalone,
      })}
      elevation={standalone ? 1 : 0}
    >
      <Typography variant="body1">
        You are subscribed to the{" "}
        <strong>{PLAN_LABELS[subscriptionPlanId] || subscriptionPlanId}</strong>{" "}
        plan.
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        If you would like to cancel your subscription or change it, send an
        e-mail to{" "}
        <Link href="mailto://support@usepow.app">support@usepow.app</Link>.
      </Typography>
    </Paper>
  )
}

export default OldPaymentForm
