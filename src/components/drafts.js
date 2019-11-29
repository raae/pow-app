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

  return (
    <>
      <Grid container spacing={4} alignItems="stretch">
        {levels.map((level, index) => {
          // const soldCount = soldCountBySku[level.sku] || 0
          const soldCount = 3

          let spotsLeft = level.count - soldCount
          console.log(
            "spotsLeft",
            spotsLeft,
            level.title,
            soldCount,
            level.count
          )

          if (spotsLeft >= 17) {
            console.log("This message will print!")
          }
          return (
            <AngelCard
              onClick={() => placeOrder(level.sku)}
              onClick={() => placeOrder(level.sku)}
            ></AngelCard>
          )
        })}
      </Grid>
    </>
  )
}
export default AngelsCheckout
