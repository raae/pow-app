import React, { useState, useEffect } from "react"
import BrandLayout from "../components/BrandLayout"
import SEO from "../components/seo"
import { Button } from "@material-ui/core"

const IndexPage = () => {
  const stripe = window.Stripe("pk_test_XiirziufElakjoOpyuyCrPfo")
  const [sku, setSku] = useState("sku_G7M4igcIzjEhU2")

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
      <SEO title="Home" />
      <h1>POW!</h1>
      <div>
        <div>
          <Button
            onClick={() => placeOrder(sku)}
            variant="contained"
            color="primary"
          >
            BRONZE
          </Button>
        </div>
        <div>
          <Button
            onClick={() => placeOrder("sku_G7M4RU5r64wP4L")}
            variant="contained"
            color="primary"
            price="$66"
          >
            SILVER
          </Button>
        </div>
        <div>
          <Button
            onClick={() => placeOrder("sku_Fvit7rtTpQFLdF")}
            variant="contained"
            color="primary"
          >
            GOLD
          </Button>
        </div>
        <div>
          <Button
            onClick={() => placeOrder("sku_G7M4igcIzjEhU2")}
            variant="contained"
            color="primary"
          >
            BRONZE
          </Button>
        </div>
      </div>
    </BrandLayout>
  )
}

export default IndexPage
// onClick={(event) => this.redirectToCheckout(event)}
// sku="sku_G7M4igcIzjEhU2" name="BRONZE" price="33"
// successUrl: "https://www.usepow.app/",
// cancelUrl: "http://localhost:8000/cancel",
