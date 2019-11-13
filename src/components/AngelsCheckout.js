import React, { useState, useEffect } from "react"
import BrandLayout from "../components/BrandLayout"
import SEO from "../components/seo"
import AngelCard from "../components/AngelCard"

const STRIPE_KEY = "pk_test_XiirziufElakjoOpyuyCrPfo"
const BRONZE_SKU = "sku_G7M4igcIzjEhU2"
const SILVER_SKU = "sku_G7M4RU5r64wP4L"
const GOLD_SKU = "sku_Fvit7rtTpQFLdF"
const DIAMOND_SKU = "sku_G7"

const AngelsCheckout = () => {
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
      <SEO title="AngelsCheckout" />
      <h1>POW!</h1>
      <div>
        <div>
          <AngelCard
            weddingAnniversary="Bronze Angel"
            priceText="500 NOK"
            spotsText="15 spots"
            description={["Lifetime access to POW! for one person."]}
            buttonText="Select"
            onClick={() => placeOrder(BRONZE_SKU)}
          ></AngelCard>
        </div>

        <div>
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
        </div>
        <div>
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
        </div>
        <div>
          <AngelCard
            weddingAnniversary="Diamond Angel"
            priceText="35 000 NOK"
            spotsText="15 spots"
            description={[
              "Lifetime access to POW! for one person.",
              "VIP Treatment at the launch party for you and your +1 guest.",
              "A 30-minute talk on privacy in apps to be delivered after March 8th anywhere in Scandinavia or as a video conference.",
            ]}
            buttonText="Select"
            buttonText="No working sku yet"
            onClick={() => placeOrder(DIAMOND_SKU)}
          ></AngelCard>
        </div>
      </div>
    </BrandLayout>
  )
}
export default AngelsCheckout
