import React, { useState, useEffect } from "react"
import { Grid } from "@material-ui/core"

import { BASE_URL, STRIPE_KEY } from "../constants"
import AngelCard from "../components/AngelCard"

const SUCCESS_URL = `${BASE_URL}/success`
const CANCEL_URL = `${BASE_URL}/cancel`

const BRONZE_SKU = "sku_G7M4igcIzjEhU2"
const SILVER_SKU = "sku_G7M4RU5r64wP4L"
const GOLD_SKU = "sku_Fvit7rtTpQFLdF"
const DIAMOND_SKU = "sku_G7"

const AngelsCheckout = () => {
  const [stripe, setStripe] = useState()

  useEffect(() => {
    if (!STRIPE_KEY) {
      console.warn("Stripe key is missing")
      return
    }

    setStripe(window.Stripe(STRIPE_KEY))
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
        <Grid item xs={12} md={6}>
          <AngelCard
            weddingAnniversary="Bronze Angel"
            priceText="500 NOK"
            spotsText="15 spots"
            description={["Lifetime access to POW! for one person."]}
            buttonText="Select"
            onClick={() => placeOrder(BRONZE_SKU)}
          ></AngelCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <AngelCard
            weddingAnniversary="Silver Angel"
            priceText="2 000 NOK"
            spotsText="10 spots"
            description={[
              "Lifetime access to POW! for one person.",
              "VIP Treatment at the launch party for you and your +1 guest.",
            ]}
            buttonText="Select"
            onClick={() => placeOrder(SILVER_SKU)}
          ></AngelCard>
        </Grid>
      </Grid>
      <Grid container spacing={4} alignItems="stretch">
        <Grid item xs={12} md={6}>
          <AngelCard
            priceText="5 000 NOK"
            weddingAnniversary="Gold Angel"
            spotsText="5 spots"
            description={[
              "Lifetime access to POW! for one person.",
              "VIP Treatment at the launch party for you and your +1 guest.",
            ]}
            buttonText="Select"
            onClick={() => placeOrder(GOLD_SKU)}
          ></AngelCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <AngelCard
            weddingAnniversary="Diamond Angel"
            priceText="35 000 NOK"
            spotsText="15 spots"
            description={[
              "Lifetime access to POW! for one person.",
              "VIP Treatment at the launch party for you and your +1 guest.",
              "A 30-minute talk on privacy in apps to be delivered after March 8th anywhere in Scandinavia or as a video conference.",
            ]}
            buttonText="No working sku yet"
            onClick={() => placeOrder(DIAMOND_SKU)}
          ></AngelCard>
        </Grid>
      </Grid>
    </>
  )
}
export default AngelsCheckout
