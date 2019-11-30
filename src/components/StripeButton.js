import { Button } from "@material-ui/core"
import React, { useState, useEffect } from "react"

import { BASE_URL } from "../constants"

const SUCCESS_URL = `${BASE_URL}/success`
const CANCEL_URL = `${BASE_URL}/cancel`

const StripeButton = ({ stripeKey, sku, children, ...props }) => {
  const [stripe, setStripe] = useState()
  useEffect(() => {
    if (!stripeKey) {
      console.warn("Stripe key is missing")
      return
    }

    setStripe(window.Stripe(stripeKey))
  }, [])

  const placeOrder = () => {
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
    <Button {...props} onClick={() => placeOrder()}>
      {children}
    </Button>
  )
}

export default StripeButton
