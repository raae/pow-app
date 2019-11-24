import React, { useState, useEffect } from "react"
import { Grid } from "@material-ui/core"

import { BASE_URL } from "../constants"
import AngelCard from "../components/AngelCard"

const SUCCESS_URL = `${BASE_URL}/success`
const CANCEL_URL = `${BASE_URL}/cancel`

const AngelsCheckout = ({ stripeKey, levels }) => {
  const [stripe, setStripe] = useState()

  useEffect(() => {
    if (!stripeKey) {
      console.warn("Stripe key is missing")
      return
    }

    setStripe(window.Stripe(stripeKey))
  }, [])

  const placeOrder = (sku) => {
    if (!stripe) return

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
    <>
      <Grid container spacing={4} alignItems="stretch">
        {levels.map((level, index) => (
          <Grid item key={index} xs={12} sm={6}>
            <AngelCard
              weddingAnniversary={level.title}
              priceText={level.priceText}
              spotsText={level.spotsText}
              description={level.benefits}
              buttonText={level.action}
              disabled={!level.sku}
              onClick={() => placeOrder(level.sku)}
            ></AngelCard>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
export default AngelsCheckout
