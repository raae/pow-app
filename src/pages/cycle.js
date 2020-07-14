import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { navigate } from "gatsby"
import { Router } from "@reach/router"

import { selectAuthUser, selectAuthIsPending } from "../auth/slice"
import { selectAreEntriesInitialized } from "../entries/slice"
import { selectAreSettingsInitialized } from "../settings/slice"

import SEO from "../components/Seo"
import Loading from "../components/Loading"

import CycleIndexPage from "../components/CycleIndexPage"
import CycleEditPage from "../components/CycleEditPage"

const CyclePage = () => {
  const user = useSelector(selectAuthUser)
  const authIsPending = useSelector(selectAuthIsPending)

  const entriesAreInitialized = useSelector(selectAreEntriesInitialized)
  const settingsAreInitialized = useSelector(selectAreSettingsInitialized)

  const hasPaid =
    user && user.protectedProfile && user.protectedProfile.stripeCustomerId
  const dataIsInitializing = !entriesAreInitialized || !settingsAreInitialized

  useEffect(() => {
    if (!user && !authIsPending) {
      navigate("/login")
    } else if (!hasPaid && !authIsPending) {
      navigate("/profile?payment=unfinished")
    }
  }, [user, authIsPending, hasPaid])

  if (!user || !hasPaid || dataIsInitializing) {
    return (
      <>
        <SEO title="Loading..." />
        <Loading fullScreen />
      </>
    )
  }

  return (
    <>
      <SEO title="Cycle" />
      <Router basepath="/cycle">
        <CycleIndexPage path="/" />
        <CycleIndexPage path=":date" />
        <CycleEditPage path=":date/edit" />
      </Router>
    </>
  )
}

export default CyclePage
