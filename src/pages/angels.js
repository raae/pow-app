import React, { useState, useEffect } from "react"
import BrandLayout from "../components/BrandLayout"
import SEO from "../components/seo"
// import { Button } from "@material-ui/core"
import AngelCard from "../components/AngelCard"

const STRIPE_KEY = "pk_test_XiirziufElakjoOpyuyCrPfo"
const BRONZE_SKU = "sku_G7M4igcIzjEhU2"
const SILVER_SKU = "sku_G7M4RU5r64wP4L"
const GOLD_SKU = "sku_Fvit7rtTpQFLdF"
const DIAMOND_SKU = "sku_G7"
//     Set up another AngelCard instance with only the button and make it work, to try to understand why it worked yesterday. 😸

//      Then set up another AngelCard instance with only the button and make that the BRONZE one

const AngelsPage = () => {
  const [stripe, setStripe] = useState()

  useEffect(() => {
    setStripe(window.Stripe(STRIPE_KEY))
  }, [])

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
          <AngelCard
            weddingAnniversary="Paper"
            priceText="100 NOK"
            onClick={() => placeOrder(SILVER_SKU)}
          ></AngelCard>
        </div>
        <div>
          <AngelCard
            weddingAnniversary="Bronze"
            priceText="800 NOK"
            spotsText="15 spots"
            description="Lifetime access to POW! for one person."
            buttonText="Select"
            skuProp={BRONZE_SKU}
            onClick={() => placeOrder(BRONZE_SKU)}
          ></AngelCard>
        </div>

        <div>
          <AngelCard
            priceText="2500 NOK"
            weddingAnniversary="Silver"
            onClick={() => placeOrder(SILVER_SKU)}
          ></AngelCard>
        </div>
        <div>
          <AngelCard
            priceText="5000 NOK"
            weddingAnniversary="Gold"
            onClick={() => placeOrder(GOLD_SKU)}
          ></AngelCard>
        </div>
        <div>
          <AngelCard
            weddingAnniversary="Diamond"
            priceText="6000 NOK"
            buttonText="No working sku yet"
            onClick={() => placeOrder(DIAMOND_SKU)}
          ></AngelCard>
        </div>
        <div>
          <AngelCard
            weddingAnniversary="Crown Jewel"
            priceText="13 000 NOK"
            buttonText="No working sku yet"
            onClick={() => placeOrder(DIAMOND_SKU)}
          ></AngelCard>
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
// <div>
//   <Button
//     onClick={() => placeOrder(SILVER_SKU)}
//     variant="contained"
//     color="primary"
//     price="$66"
//   >
//     SILVER
//   </Button>
// </div>
