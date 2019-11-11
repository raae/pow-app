import React from "react"
import BrandLayout from "../components/BrandLayout"
import SEO from "../components/seo"
import { Link } from "gatsby"

const SuccessPage = () => {
  return (
    <BrandLayout>
      <SEO title="Success" />
      <h1>POW!</h1>
      <div>
        <p>Thanks a Thousand</p>
      </div>
      <div>
        <Link to="/">Go back to the POW! App</Link>
      </div>
    </BrandLayout>
  )
}

export default SuccessPage
