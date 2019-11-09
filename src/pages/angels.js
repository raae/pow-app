import React from "react"
import BrandLayout from "../components/BrandLayout"
import SEO from "../components/seo"
import { Button } from "@material-ui/core"

const AngelsPage = () => {
  const STRIPE_KEY = "pk_test_XiirziufElakjoOpyuyCrPfo"

  const BRONZE_SKU = "sku_G7M4igcIzjEhU2"
  const SILVER_SKU = "sku_G7M4RU5r64wP4L"
  const GOLD_SKU = "sku_Fvit7rtTpQFLdF"
  const DIAMOND_SKU = "sku_G7"

  const stripe = window.Stripe(STRIPE_KEY)

  const placeOrder = (sku) => {
    stripe.redirectToCheckout({
      items: [
        {
          sku,
          quantity: 1,
        },
      ],
      successUrl: "http://localhost:8000/success",
      cancelUrl: "http://localhost:8000/cancel",
    })
  }
  return (
    <BrandLayout>
      <SEO title="Angels" />
      <h1>POW!</h1>
      <div>
        <div>
          <Button
            onClick={() => placeOrder(BRONZE_SKU)}
            variant="contained"
            color="primary"
          >
            BRONZE
          </Button>
        </div>
        <div>
          <Button
            onClick={() => placeOrder(SILVER_SKU)}
            variant="contained"
            color="primary"
            price="$66"
          >
            SILVER
          </Button>
        </div>
        <div>
          <Button
            onClick={() => placeOrder(GOLD_SKU)}
            variant="contained"
            color="primary"
          >
            GOLD
          </Button>
        </div>
        <div>
          <Button
            onClick={() => placeOrder(DIAMOND_SKU)}
            variant="contained"
            color="primary"
          >
            DIAMOND
          </Button>
        </div>
      </div>
    </BrandLayout>
  )
}

export default AngelsPage
// onClick={(event) => this.redirectToCheckout(event)}
// sku="sku_G7M4igcIzjEhU2" name="BRONZE" price="33"
// successUrl: "https://www.usepow.app/",
// cancelUrl: "http://localhost:8000/cancel",
//   const [sku] = useState("sku_G7M4igcIzjEhU2")
// { useState, useEffect }
