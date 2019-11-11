import React from "react"
import BrandLayout from "../components/BrandLayout"
import { Link } from "gatsby"

const CancelPage = () => {
  return (
    <BrandLayout>
      <h1>POW!</h1>
      <div>
        <p>Your Payment Was Canceled, try again.</p>
      </div>
      <div>
        <Link to="/angels">Go back to the POW! Angels Page</Link>
      </div>
    </BrandLayout>
  )
}

export default CancelPage
