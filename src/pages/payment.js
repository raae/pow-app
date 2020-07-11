import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { navigate } from "gatsby"

import { useDataState } from "../database"
import { CycleProvider } from "../cycle"

import SEO from "../components/Seo"
import Loading from "../components/Loading"

import BrandLayout from "../components/BrandLayout"
import PaymentForm from "../components/PaymentForm"

import { selectAuthUser, selectAuthIsPending } from "../auth/slice"

const PaymentPage = () => {
  const user = useSelector(selectAuthUser)
  const authIsPending = useSelector(selectAuthIsPending)

  const { isPending: dataIsPending, entries, settings } = useDataState()

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
