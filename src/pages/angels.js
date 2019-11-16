import React from "react"
import BrandLayout from "../components/BrandLayout"
import SEO from "../components/Seo"
import AngelsCheckout from "../components/AngelsCheckout"

const AngelsPage = () => {
  return (
    <BrandLayout>
      <SEO title="AngelsPage" />
      <AngelsCheckout></AngelsCheckout>
    </BrandLayout>
  )
}

export default AngelsPage

// successUrl: "https://www.usepow.app/",
