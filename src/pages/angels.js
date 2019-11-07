import React from "react"
import BrandLayout from "../components/BrandLayout"
import SEO from "../components/seo"
import { Button } from "@material-ui/core"

const IndexPage = () => {
  //   console.log(window.Stripe)

  const stripe = window.Stripe("pk_test_XiirziufElakjoOpyuyCrPfo")

  //   event.preventDefault()

  const placeOrder = (sku) => {
    stripe.redirectToCheckout({
      items: [
        {
          sku,
          quantity: 1,
        },
      ],
      successUrl: "https://www.usepow.app/",
      cancelUrl: "http://localhost:8000/",
    })
  }
  return (
    <BrandLayout>
      <SEO title="Home" />
      <h1>POW!</h1>
      <div>
        <Button
          variant="contained"
          onClick={() => placeOrder("sku_G7M4igcIzjEhU2")}
        >
          Bla
        </Button>
      </div>
    </BrandLayout>
  )
}

export default IndexPage
// onClick={(event) => this.redirectToCheckout(event)}
// sku="sku_G7M4igcIzjEhU2" name="BRONZE" price="33"
