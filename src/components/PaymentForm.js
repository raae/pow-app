import React, { useState, useEffect } from "react"
import { Link as GatsbyLink } from "gatsby"
import { loadStripe } from "@stripe/stripe-js"
import classNames from "classnames"

import { STRIPE_KEY, BASE_URL } from "../constants"

import { useQueryParam } from "../utils/useQueryParam"
import { useAuthState, useAuthActions } from "../auth"

import {
  FormControl,
  Radio,
  FormControlLabel,
  RadioGroup,
  Typography,
  Link,
  Button,
  Paper,
  makeStyles,
} from "@material-ui/core"

import Alert from "@material-ui/lab/Alert"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%", // Fix IE 11 issue.
  },
  standalone: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(4),
  },
  space: {
    margin: theme.spacing(3, 0, 3),
  },
}))

const PaymentForm = ({ standalone = true, submitLabel }) => {
  const classes = useStyles()

  const stripeStatus = useQueryParam("stripe")

  const { user, isPending: isAuthIsPending } = useAuthState()
  const { signOut } = useAuthActions()

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

  const handleSignOut = async (event) => {
    event.preventDefault()
    setIsPending(true)
    const result = await signOut()
    setError(result.error)
    setIsPending(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsPending(true)
    stripe
      .redirectToCheckout({
        items: [
          { plan: `${values.subscriptionPlan}_sub_2020_03`, quantity: 1 },
        ],
        clientReferenceId: user.userId,
        successUrl: BASE_URL + "/day",
        cancelUrl: BASE_URL + "/payment?stripe=canceled",
      })
      .then(function(result) {
        if (result.error) {
          setError(result.error)
        } else {
          setError()
        }
        setIsPending(false)
      })
  }

  return (
    <Paper
      component="form"
      className={classNames(classes.root, {
        [classes.standalone]: standalone,
      })}
      elevation={standalone ? 1 : 0}
      noValidate
      onSubmit={handleSubmit}
    >
      {stripeStatus === "failed" && (
        <Alert className={classes.space} severity="warning">
          Payment either failed, or we never got there while signing you up for
          POW!.
        </Alert>
      )}
      {!user && !isAuthIsPending && (
        <Alert className={classes.space} severity="warning">
          <div>
            You must be <GatsbyLink to="/login">logged in</GatsbyLink> to pay.
          </div>
        </Alert>
      )}
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
      <Typography component="div" color="textSecondary">
        <p>
          If you for any reason is not happy with POW! let me know and I'll
          refund your money (within 60 days of purchase). <br />
          <cite>
            — <Link href="https://twitter.com/raae">@raae</Link>
          </cite>
        </p>
      </Typography>
      {error && <Alert severity="warning">{error.message}</Alert>}
      {stripeStatus === "canceled" && (
        <Alert severity="error">Payment was canceled, please try again.</Alert>
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
      {user && (
        <Typography variant="body2" align="right">
          Or{" "}
          <Link type="button" component="button" onClick={handleSignOut}>
            sign out
          </Link>
        </Typography>
      )}
    </Paper>
  )
}

export default PaymentForm