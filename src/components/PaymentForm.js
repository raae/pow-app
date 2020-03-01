import React, { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"

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
  makeStyles,
} from "@material-ui/core"

import Alert from "@material-ui/lab/Alert"

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  alert: {
    margin: theme.spacing(3, 0, 1),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
}))

const PaymentForm = ({ submitLabel }) => {
  const classes = useStyles()

  const stripeStatus = useQueryParam("stripe")

  const { user } = useAuthState()
  const { updateUser } = useAuthActions()

  const [values, setValues] = useState({
    subscriptionPlan: "yearly",
  })
  const [error, setError] = useState()
  const [stripe, setStripe] = useState()

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

    await updateUser({ profile: { plan: values.subscriptionPlan } })

    stripe
      .redirectToCheckout({
        items: [
          { plan: `${values.subscriptionPlan}_sub_2020_03`, quantity: 1 },
        ],
        clientReferenceId: user.userId,
        successUrl: BASE_URL + "/app",
        cancelUrl: BASE_URL + "/payment?stripe=canceled",
      })
      .then(function(result) {
        if (result.error) {
          setError(result.error)
        } else {
          setError()
        }
      })
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
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
      {stripeStatus === "failed" && (
        <Alert severity="error">Payment failed, please try again.</Alert>
      )}
      <Button
        className={classes.submit}
        disabled={!user || !stripe}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        {submitLabel ? submitLabel : "Go to payment"}
      </Button>
    </form>
  )
}

export default PaymentForm
