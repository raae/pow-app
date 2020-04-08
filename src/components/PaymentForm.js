import React, { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import classNames from "classnames"

import { STRIPE_KEY, BASE_URL } from "../constants"

import { useQueryParam } from "../utils/useQueryParam"
import { useAuthState } from "../auth"

import {
  FormControl,
  Radio,
  FormControlLabel,
  RadioGroup,
  Typography,
  Button,
  Paper,
  makeStyles,
} from "@material-ui/core"

import Alert from "@material-ui/lab/Alert"

import { Link } from "./Link"

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

  const { user } = useAuthState()

  const hasPaid =
    user && user.protectedProfile && user.protectedProfile.stripeCustomerId

  const [values, setValues] = useState({
    subscriptionPlan: "yearly",
  })
  const [error, setError] = useState()
  const [stripe, setStripe] = useState()
  const [isPending, setIsPending] = useState()

  useEffect(() => {
    loadStripe(STRIPE_KEY).then((stripe) => {
      setStripe(stripe)
    })
  }, [])

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    onDone()
    setIsPending(true)
    stripe
      .redirectToCheckout({
        items: [
          { plan: `${values.subscriptionPlan}_sub_2020_03`, quantity: 1 },
        ],
        clientReferenceId: user.userId,
        successUrl: BASE_URL + "/cycle",
        cancelUrl: BASE_URL + "/profile?payment=canceled",
        // email: "rart",
      })
      .then((result) => {
        if (result.error) {
          setError(result.error)
        } else {
          setError()
        }
        setIsPending(false)
      })
      .catch((error) => {
        setError(error)
        setIsPending(false)
      })
  }

  if (hasPaid) {
    return (
      <>
        <Typography component="p" gutterBottom>
          You are subscribed to the{" "}
          <strong>{user.protectedProfile.stripePlanId.split("_")[0]}</strong>{" "}
          plan.
        </Typography>
        <Typography component="p" gutterBottom>
          If you would like to cancel your subscription, or change it, send an
          e-mail to{" "}
          <Link href="mailto://support@usepow.app">support@usepow.app</Link>.
        </Typography>
        <Typography component="p">
          <small>PS. This will be automated shortly.</small>
        </Typography>
      </>
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
          onSubmit={handleSubmit}
        >
          <Typography className={classes.space} color="textSecondary">
            Choose between a monthly or a yearly plan.
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="Subscription Plan"
              name="subscriptionPlan"
              value={values.subscriptionPlan}
              onChange={handleChange("subscriptionPlan")}
            >
              <FormControlLabel
                value="monthly"
                control={<Radio />}
                label={
                  <Typography>
                    USD <strong>4.50</strong> per month
                  </Typography>
                }
              />
              <FormControlLabel
                value="yearly"
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
            disabled={!user || !stripe || isPending}
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
