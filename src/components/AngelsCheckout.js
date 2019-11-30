import React, { useState, useEffect } from "react"
import axios from "axios"
import { isString } from "lodash"
import { Grid } from "@material-ui/core"

import { BASE_URL, GATSBY_AUTH_KEY } from "../constants"
import AngelCard from "../components/AngelCard"
import StripePaperButton from "../components/StripePaperButton"

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
          let spotsText = `${level.count}`
          let spotsLeft = "1" // only needs to be more than 0 to activate button

          if (!isString(level.count)) {
            spotsLeft = -1
            spotsText = `? of ${level.count} spots left`

            if (soldCountBySku) {
              const soldCount = soldCountBySku[level.sku] || 0
              spotsLeft = level.count - soldCount
              spotsText = `${spotsLeft} of ${level.count} spots left`
            }
          }

          return (
            <Grid item key={index} xs={12} sm={6}>
              <AngelCard
                weddingAnniversary={level.title}
                priceText={level.priceText}
                spotsText={spotsText}
                description={level.benefits}
                buttonText={level.action}
                disabled={!level.sku || !stripe || spotsLeft < 1}
                onClick={() => placeOrder(level.sku)}
              ></AngelCard>
            </Grid>
          )
        })}
      </Grid>
      <div>
        <StripePaperButton>Yu!</StripePaperButton>
      </div>
    </>
  )
}
export default AngelsCheckout
