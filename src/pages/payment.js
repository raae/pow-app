import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { navigate } from "gatsby"

import { selectAuthUser, selectAuthIsPending } from "../auth/slice"
import { selectEntries, selectAreEntriesInitialized } from "../entries/slice"
import {
  selectSettingsById,
  selectAreSettingsInitialized,
} from "../settings/slice"

import { CycleProvider } from "../cycle"

import SEO from "../components/Seo"
import Loading from "../components/Loading"

import BrandLayout from "../components/BrandLayout"
import PaymentForm from "../components/PaymentForm"

const PaymentPage = () => {
  const user = useSelector(selectAuthUser)
  const authIsPending = useSelector(selectAuthIsPending)
  const entries = useSelector(selectEntries)
  const settings = useSelector(selectSettingsById)
  const entriesAreInitialized = useSelector(selectAreEntriesInitialized)
  const settingsAreInitialized = useSelector(selectAreSettingsInitialized)

  const dataIsPending = !entriesAreInitialized || !settingsAreInitialized

  useEffect(() => {
    if (!user && !authIsPending) {
      navigate("/login")
    }
  }, [user, authIsPending])

  if (!user || dataIsPending) {
    return (
      <>
        <SEO title="Loading..." />
        <Loading fullScreen />
      </>
    )
  }

  return (
    <CycleProvider entries={entries} settings={settings}>
      <SEO title="Payment" />
      <BrandLayout variant="app">
        <h1>Payment</h1>
        <PaymentForm standalone />
      </BrandLayout>
    </CycleProvider>
  )
}

export default PaymentPage
