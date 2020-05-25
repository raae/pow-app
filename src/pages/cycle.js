import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { Router } from "@reach/router"

import { useAuthState } from "../auth"
import { useDataState } from "../database"
import { CycleProvider } from "../cycle"

import SEO from "../components/Seo"
import Loading from "../components/Loading"

import CycleIndexPage from "../components/CycleIndexPage"
import CycleEditPage from "../components/CycleEditPage"

const CyclePage = () => {
  const { user, isPending: authIsPending } = useAuthState()
  const { isPending: dataIsPending, entries, settings } = useDataState()
  const hasPaid =
    user && user.protectedProfile && user.protectedProfile.stripeCustomerId

  useEffect(() => {
    if (!user && !authIsPending) {
      navigate("/login")
    } else if (!hasPaid && !authIsPending) {
      navigate("/profile?payment=unfinished")
    }
  }, [user, authIsPending, hasPaid])

  if (!user || !hasPaid || dataIsPending) {
    return (
      <>
        <SEO title="Loading..." />
        <Loading fullScreen />
      </>
    )
  }

  return (
    <CycleProvider entries={entries} settings={settings}>
      <SEO title="Cycle" />
      <Router basepath="/cycle">
        <CycleIndexPage path="/" />
        <CycleIndexPage path=":date" />
        <CycleEditPage path=":date/edit" />
      </Router>
    </CycleProvider>
  )
}

export default CyclePage
