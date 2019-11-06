import React from "react"
import BrandLayout from "../components/BrandLayout"
import SEO from "../components/seo"

const IndexPage = () => {
  //   console.log(window.Stripe)

  const stripe = window.Stripe("pk_test_XiirziufElakjoOpyuyCrPfo")
  debugger
  stripe.redirectToCheckout({
    items: [
      {
        sku: "sku_G7M4igcIzjEhU2",
        quantity: 1,
      },
    ],
    successUrl: "https://www.usepow.app/",
    cancelUrl: "http://localhost:8000/",
  })

  return (
    <BrandLayout>
      <SEO title="Home" />
      <h1>POW!</h1>
    </BrandLayout>
  )
}

export default IndexPage
