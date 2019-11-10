import React, { useState, useEffect } from "react"
import BrandLayout from "../components/BrandLayout"
import SEO from "../components/seo"
import AngelCard from "../components/AngelCard"

const STRIPE_KEY = "pk_test_XiirziufElakjoOpyuyCrPfo"
const BRONZE_SKU = "sku_G7M4igcIzjEhU2"
const SILVER_SKU = "sku_G7M4RU5r64wP4L"
const GOLD_SKU = "sku_Fvit7rtTpQFLdF"
const DIAMOND_SKU = "sku_G7"

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
            weddingAnniversary="Bronze Angel"
            priceText="500 NOK"
            spotsText="15 spots"
            description1="Lifetime access to POW! for one person."
            buttonText="Select"
            skuProp={BRONZE_SKU}
            onClick={() => placeOrder(BRONZE_SKU)}
          ></AngelCard>
        </div>

        <div>
          <AngelCard
            weddingAnniversary="Silver Angel"
            priceText="2 000 NOK"
            spotsText="10 spots"
            description1="Lifetime access to POW! for one person."
            description2="VIP Treatment at the launch party for you and your +1 guest."
            buttonText="Select"
            skuProp={SILVER_SKU}
            onClick={() => placeOrder(SILVER_SKU)}
          ></AngelCard>
        </div>
        <div>
          <AngelCard
            priceText="5 000 NOK"
            weddingAnniversary="Gold Angel"
            spotsText="5 spots"
            description1="Lifetime access to POW! for one person."
            description2="VIP Treatment at the launch party for you and your +1 guest."
            buttonText="Select"
            skuProp={GOLD_SKU}
            onClick={() => placeOrder(GOLD_SKU)}
          ></AngelCard>
        </div>
        <div>
          <AngelCard
            weddingAnniversary="Diamond Angel"
            priceText="35 000 NOK"
            spotsText="15 spots"
            description1="Lifetime access to POW! for one person."
            description2="VIP Treatment at the launch party for you and your +1 guest."
            description3="A 30-minute talk on privacy in apps to be delivered after March 8th anywhere in Scandinavia or as a video conference."
            buttonText="Select"
            skuProp={DIAMOND_SKU}
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

// successUrl: "https://www.usepow.app/",
// cancelUrl: "http://localhost:8000/cancel",
