import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { navigate } from "gatsby"

import { selectIsAuthenticated, selectAuthIsPending } from "../auth/slice"
import { selectAreEntriesLoading } from "../entries/slice"
import { selectAreSettingsLoading } from "../settings/slice"

import SEO from "../components/Seo"
import Loading from "../components/Loading"

import BrandLayout from "../brand/BrandLayout"
import PaymentForm from "../components/PaymentForm"

const PaymentPage = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const authIsPending = useSelector(selectAuthIsPending)
  const entriesAreLoading = useSelector(selectAreEntriesLoading)
  const settingsAreLoading = useSelector(selectAreSettingsLoading)

  const dataIsLoading = entriesAreLoading || settingsAreLoading

  useEffect(() => {
    if (!isAuthenticated && !authIsPending) {
      navigate("/login")
    }
  }, [isAuthenticated, authIsPending])

  if (!isAuthenticated || dataIsLoading) {
    return (
      <>
        <SEO title="Loading..." />
        <Loading fullScreen />
      </>
    )
  }

  return (
    <>
      <SEO title="Payment" />
      <BrandLayout variant="app">
        <h1>Payment</h1>
        <PaymentForm standalone />
      </BrandLayout>
    </>
  )
}

export default PaymentPage
