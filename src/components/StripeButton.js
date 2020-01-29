import { Button } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import axios from "axios"

import { BASE_URL, STRIPE_KEY } from "../constants"

const SUCCESS_URL = `${BASE_URL}/success`
const CANCEL_URL = `${BASE_URL}/cancel`

const StripeButton = ({
  stripeKey = STRIPE_KEY,
  successUrl = SUCCESS_URL,
  cancelUrl = CANCEL_URL,
  lineItem,
  children,
  ...props
}) => {
  const [stripe, setStripe] = useState()
  const [processing, setProcessing] = useState()
  useEffect(() => {
    if (!stripeKey) {
      console.warn("Stripe key is missing")
      return
    }

    setStripe(window.Stripe(stripeKey))
  }, [stripeKey])

  const placeOrder = async () => {
    if (!stripe) return

    setProcessing(true)

    try {
      const response = await axios.post("/.netlify/functions/checkout", {
        line_item: lineItem,
        success_url: successUrl,
        cancel_url: cancelUrl,
      })

      const sessionId = response.data.session_id

      stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      setProcessing(false)
      console.log(error)
    }
  }

  return (
    <Button
      disabled={lineItem.amount < 100 || !stripe || processing}
      {...props}
      onClick={() => placeOrder()}
    >
      {children}
    </Button>
  )
}

export default StripeButton
