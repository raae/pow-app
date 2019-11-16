import React from "react"
import BrandLayout from "../components/BrandLayout"
import SEO from "../components/Seo"
import AngelsCheckout from "../components/AngelsCheckout"

const AngelsPage = () => {
  return (
    <BrandLayout>
      <SEO title="Angels" />
      <AngelsCheckout></AngelsCheckout>
    </BrandLayout>
  )
}

export default AngelsPage
