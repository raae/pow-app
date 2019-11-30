import { Button } from "@material-ui/core"
import React, { useState, useEffect } from "react"

import { BASE_URL, GATSBY_AUTH_KEY } from "../constants"

const SUCCESS_URL = `${BASE_URL}/success`
const CANCEL_URL = `${BASE_URL}/cancel`

const StripePaperButton = ({ stripeKey, children, paperAngel, ...props }) => {
  const [stripe, setStripe] = useState()
  useEffect(() => {
    if (!stripeKey) {
      console.warn("Stripe key is missing")
      return
    }

    setStripe(window.Stripe(stripeKey))
  }, [])

  const placeOrder = (paperAngel.sku) => {
    if (!stripe || !sku) return

    stripe.redirectToCheckout({
      items: [
        {
          sku,
          quantity: 1,
        },
      ],
      successUrl: SUCCESS_URL,
      cancelUrl: CANCEL_URL,
    })
  }
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => placeOrder(paperAngel.sku)}
    >
      {props.buttonText}
    </Button>
  )
}

export default StripePaperButton
