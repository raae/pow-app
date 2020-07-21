import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { navigate } from "gatsby"

import { selectIsAuthenticated, selectAuthIsPending } from "../auth/slice"
import { selectAreEntriesInitialized } from "../entries/slice"
import { selectAreSettingsInitialized } from "../settings/slice"

import SEO from "../components/Seo"
import Loading from "../components/Loading"

import BrandLayout from "../components/BrandLayout"
import PaymentForm from "../components/PaymentForm"

const PaymentPage = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const authIsPending = useSelector(selectAuthIsPending)
  const entriesAreInitialized = useSelector(selectAreEntriesInitialized)
  const settingsAreInitialized = useSelector(selectAreSettingsInitialized)

  const dataIsPending = !entriesAreInitialized || !settingsAreInitialized

  useEffect(() => {
    if (!isAuthenticated && !authIsPending) {
      navigate("/login")
    }
  }, [isAuthenticated, authIsPending])

  if (!isAuthenticated || dataIsPending) {
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
