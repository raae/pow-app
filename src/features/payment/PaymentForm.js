import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { loadStripe } from "@stripe/stripe-js"
import { formatDistance, format } from "date-fns"
import userbase from "userbase-js"
import classNames from "classnames"

import {
  FormControl,
  Radio,
  FormControlLabel,
  RadioGroup,
  Typography,
  Button,
  Paper,
  Box,
  makeStyles,
} from "@material-ui/core"

import Alert from "@material-ui/lab/Alert"

import { Link } from "../navigation"

import {
  STRIPE_KEY,
  STRIPE_MONTHLY_PLAN_ID,
  STRIPE_YEARLY_PLAN_ID,
  BASE_URL,
} from "../../constants"

import { useQueryParam } from "../utils/useQueryParam"
import {
  init,
  selectIsPayingUser,
  selectIsAuthenticated,
  selectCancelSubscriptionAt,
  selectHasActiveSubscription,
} from "../auth"

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

const PaymentForm = ({ standalone = true, submitLabel, onDone = () => {} }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const paymentStatus = useQueryParam("payment")

  const isAuthenticated = useSelector(selectIsAuthenticated)
  // hasPaid either through userbase or old way
  const hasPaid = useSelector(selectIsPayingUser)
  // hasActiveSubscription indicated paid through userbase
  const hasActiveSubscription = useSelector(selectHasActiveSubscription)
  const cancelSubscriptionAt = useSelector(selectCancelSubscriptionAt)

  const [selectedPlan, setSelectedPlan] = useState(STRIPE_YEARLY_PLAN_ID)
  const [error, setError] = useState()
  const [isPending, setIsPending] = useState()

  const isDisabled = !isAuthenticated || isPending

  const handleSelectedPlanChange = (event) => {
    setSelectedPlan(event.target.value)
  }

  const handleSubscription = (variant) => async (event) => {
    event.preventDefault()
    onDone()
    setIsPending(true)

    try {
      // Stripe needs to be loaded before using userbase subscription methods
      await loadStripe(STRIPE_KEY)

      switch (variant) {
        case "purchase":
          await userbase.purchaseSubscription({
            successUrl: BASE_URL + "/timeline",
            cancelUrl: BASE_URL + "/profile?payment=canceled",
            priceId: selectedPlan,
          })
          break

        case "update":
          await userbase.updatePaymentMethod({
            successUrl: BASE_URL + "/profile",
            cancelUrl: BASE_URL + "/profile",
          })
          break

        case "cancel":
          await userbase.cancelSubscription()
          await dispatch(init())
          break

        case "resume":
          await userbase.resumeSubscription()
          await dispatch(init())
          break

        default:
          console.warn("No valid handleSubscription variant", variant)
          break
      }

      setError()
    } catch (error) {
      setError(error)
    }

    setIsPending(false)
  }

  if (hasActiveSubscription) {
    return (
      <>
        {cancelSubscriptionAt ? (
          <>
            <Box mb={2}>
              <Typography variant="body1" component="h2">
                Your subscription expires in{" "}
                {formatDistance(new Date(cancelSubscriptionAt), new Date())} on{" "}
                {format(new Date(cancelSubscriptionAt), "MMMM do")}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                You may resume you subscription at any time until then.
              </Typography>
            </Box>

            <Button
              disabled={isDisabled}
              variant="outlined"
              color="secondary"
              onClick={handleSubscription("resume")}
            >
              Resume subscription
            </Button>
          </>
        ) : (
          <>
            <Box mb={2}>
              <Typography variant="body1" component="h2">
                Update Subscription
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Do you need to change the card on file or your billing email
                address?
              </Typography>
            </Box>

            <Button
              disabled={isDisabled}
              variant="outlined"
              color="secondary"
              onClick={handleSubscription("update")}
            >
              Update subscription
            </Button>

            <Box mb={2} mt={4}>
              <Typography variant="body1" component="h2">
                Cancel Subscription
              </Typography>
              <Typography variant="body2" color="textSecondary">
                You will be able to access POW! and resume the subscription
                until the end of the current billing period.
              </Typography>
            </Box>

            <Button
              disabled={isDisabled}
              variant="outlined"
              onClick={handleSubscription("cancel")}
            >
              Cancel subscription
            </Button>
          </>
        )}
      </>
    )
  } else if (hasPaid) {
    return (
      <Typography variant="body2" color="textSecondary" gutterBottom>
        If you would like to cancel your subscription or change it, send an
        e-mail to{" "}
        <Link href="mailto://support@usepow.app">support@usepow.app</Link>.
      </Typography>
    )
  } else {
    return (
      <>
        {paymentStatus === "unfinished" && (
          <Alert className={classes.space} severity="warning">
            Payment is required before starting to use POW!
          </Alert>
        )}
        {paymentStatus === "canceled" && (
          <Alert className={classes.space} severity="error">
            Payment was canceled, please try again.
          </Alert>
        )}
        <Paper
          component="form"
          className={classNames(classes.root, {
            [classes.standalone]: standalone,
          })}
          elevation={standalone ? 1 : 0}
          noValidate
          onSubmit={handleSubscription("purchase")}
        >
          <Typography className={classes.space} color="textSecondary">
            Choose between a monthly or a yearly plan.
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="Subscription Plan"
              name="subscriptionPlan"
              value={selectedPlan}
              onChange={handleSelectedPlanChange}
            >
              <FormControlLabel
                value={STRIPE_MONTHLY_PLAN_ID}
                control={<Radio />}
                label={
                  <Typography>
                    USD <strong>4.50</strong> per month
                  </Typography>
                }
              />
              <FormControlLabel
                value={STRIPE_YEARLY_PLAN_ID}
                control={<Radio />}
                label={
                  <>
                    <Typography component="span">
                      USD <strong>45.00</strong> per year
                    </Typography>
                    <Typography color="textSecondary" component="span">
                      {" "}
                      = 2 months free
                    </Typography>
                  </>
                }
              />
            </RadioGroup>
          </FormControl>
          <Alert className={classes.alert} severity="info">
            60 days money back guaranty.
          </Alert>
          {error && (
            <Alert className={classes.alert} severity="warning">
              {error.message}
            </Alert>
          )}
          <Button
            className={classes.space}
            disabled={isDisabled}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {submitLabel ? submitLabel : "Subscribe"}
          </Button>
        </Paper>
      </>
    )
  }
}

export default PaymentForm
