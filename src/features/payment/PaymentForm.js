import React, { useState, useEffect, useRef } from "react"
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
import { CardContentSection } from "../../components"

import {
  STRIPE_KEY,
  STRIPE_MONTHLY_PLAN_ID,
  STRIPE_YEARLY_PLAN_ID,
  BASE_URL,
} from "../../constants"

import { useQueryParam } from "../utils/useQueryParam"
import { useSubscription } from "../user"
import { useAuth } from "../auth"

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

const PaymentForm = ({ standalone = true, submitLabel, onDone = () => {} }) => {
  const classes = useStyles()

  const paymentStatus = useQueryParam("payment")

  const { isAuthenticated: isAuthFulfilled } = useAuth()
  const {
    isSubscribed,
    isSubscriptionUpdatable,
    cancelSubscriptionAt,
    subscriptionPlanId,
  } = useSubscription()

  const [selectedPlan, setSelectedPlan] = useState(STRIPE_YEARLY_PLAN_ID)
  const [error, setError] = useState()
  const [isPending, setIsPending] = useState()
  const cancelSubscriptionAtRef = useRef(cancelSubscriptionAt)

  const isDisabled = !isAuthFulfilled || isPending

  const handleSelectedPlanChange = (event) => {
    setSelectedPlan(event.target.value)
  }

  useEffect(() => {
    if (cancelSubscriptionAtRef.current !== cancelSubscriptionAt) {
      setIsPending(false)
    }
    cancelSubscriptionAtRef.current = cancelSubscriptionAt
  }, [cancelSubscriptionAt])

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
            cancelUrl: BASE_URL + "/incomplete?payment=canceled",
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
          break

        case "resume":
          await userbase.resumeSubscription()
          break

        default:
          console.warn("No valid handleSubscription variant", variant)
          break
      }

      setError(null)
    } catch (error) {
      setError(error)
      setIsPending(false)
    }
  }

  if (isSubscriptionUpdatable) {
    return (
      <>
        {cancelSubscriptionAt ? (
          <>
            <CardContentSection
              title={
                <>
                  Your <strong>{PLAN_LABELS[subscriptionPlanId]}</strong>{" "}
                  subscription expires in{" "}
                  {formatDistance(new Date(cancelSubscriptionAt), new Date())}{" "}
                  on {format(new Date(cancelSubscriptionAt), "MMMM do")}
                </>
              }
              subheader={
                "You may resume you subscription at any time until then."
              }
            >
              <Button
                disabled={isDisabled}
                variant="outlined"
                color="secondary"
                onClick={handleSubscription("resume")}
              >
                Resume subscription
              </Button>
            </CardContentSection>
          </>
        ) : (
          <>
            {!isSubscribed && (
              <Box mb={4}>
                <Alert className={classes.space} severity="warning">
                  To continue using POW! update your billing information.
                </Alert>
              </Box>
            )}

            <CardContentSection
              title={
                <>
                  You are subscribed to the{" "}
                  <strong>
                    {PLAN_LABELS[subscriptionPlanId] || subscriptionPlanId}
                  </strong>{" "}
                  plan
                </>
              }
              subheader="Do you need to change the card on file or the billing email address?"
            >
              <Button
                disabled={isDisabled}
                variant="outlined"
                color="secondary"
                onClick={handleSubscription("update")}
              >
                Update billing information
              </Button>
            </CardContentSection>

            <CardContentSection
              title="Cancel Subscription"
              subheader="You will be able to access POW! and resume the subscription until the end of the current billing period."
            >
              <Button
                disabled={isDisabled}
                variant="outlined"
                onClick={handleSubscription("cancel")}
              >
                Cancel subscription
              </Button>
            </CardContentSection>
          </>
        )}
      </>
    )
  } else {
    return (
      <>
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
