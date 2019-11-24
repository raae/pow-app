import React, { useState, useEffect } from "react"
import axios from "axios"
import { Grid } from "@material-ui/core"

import { BASE_URL, GATSBY_AUTH_KEY } from "../constants"
import AngelCard from "../components/AngelCard"

const SUCCESS_URL = `${BASE_URL}/success`
const CANCEL_URL = `${BASE_URL}/cancel`

const AngelsCheckout = ({ stripeKey, levels }) => {
  const [stripe, setStripe] = useState()
  const [soldCountBySku, setSoldCountBySku] = useState({})

  useEffect(() => {
    axios
      .get("/.netlify/functions/sold-count", {
        headers: {
          Authorization: GATSBY_AUTH_KEY,
        },
        params: {
          stripePublicKey: stripeKey,
        },
      })
      .then((response) => {
        setSoldCountBySku(response.data)
      })
      .catch((error) => {
        console.warn("Status", error)
      })
  }, [])

  useEffect(() => {
    if (!stripeKey) {
      console.warn("Stripe key is missing")
      return
    }

    setStripe(window.Stripe(stripeKey))
  }, [])

  const placeOrder = (sku) => {
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
    <>
      <Grid container spacing={4} alignItems="stretch">
        {levels.map((level, index) => {
          const soldCount = soldCountBySku[level.sku] || 0
          console.log(level.sku, soldCount)
          // Add spots params to angel data levels
          // Calculate spots left based on level.spots
          // Dynamically change spotsText based on spots left
          // and use that for the card spotsText
          // Set card disabled to true also when there is 0 spots left
          return (
            <Grid item key={index} xs={12} sm={6}>
              <AngelCard
                weddingAnniversary={level.title}
                priceText={level.priceText}
                spotsText={level.spotsText}
                description={level.benefits}
                buttonText={level.action}
                disabled={!level.sku || !stripe}
                onClick={() => placeOrder(level.sku)}
              ></AngelCard>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
export default AngelsCheckout
