import React from "react"

import SEO from "../components/seo"
import Checkout from "../components/checkout"
import BrandLayout from "../components/BrandLayout"

// const PINK_EAR_CANDY_SKU =
// const STRIPE_KEY =

const IndexPage = () => {
  return (
    <BrandLayout>
      <SEO title="Home" />

      <p>POW! Angels</p>

      <div>
        <article>
          <Checkout
            sku="sku_G7M4igcIzjEhU2"
            value="sku_G7M4igcIzjEhU2"
            name="BRONZE"
            price="$33"
          />
          <Checkout
            sku="sku_G7M4RU5r64wP4L"
            value="sku_G7M4RU5r64wP4L"
            name="SILVER"
            price="$66"
          />
          <Checkout
            sku="sku_Fvit7rtTpQFLdF"
            value="sku_Fvit7rtTpQFLdF"
            name="GOLD"
            price="$99"
          />
        </article>
      </div>
    </BrandLayout>
  )
}

export default IndexPage

// <img src="https://www.usepow.app/screenshot.png" alt="POW!" />
