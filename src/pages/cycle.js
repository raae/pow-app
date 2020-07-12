import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { navigate } from "gatsby"
import { Router } from "@reach/router"

import { selectAuthUser, selectAuthIsPending } from "../auth/slice"
import { selectEntries, selectAreEntriesInitialized } from "../entries/slice"
import {
  selectSettingsById,
  selectAreSettingsInitialized,
} from "../settings/slice"
import { CycleProvider } from "../cycle"

import SEO from "../components/Seo"
import Loading from "../components/Loading"

import CycleIndexPage from "../components/CycleIndexPage"
import CycleEditPage from "../components/CycleEditPage"

const CyclePage = () => {
  const user = useSelector(selectAuthUser)
  const authIsPending = useSelector(selectAuthIsPending)

  const entriesAreInitialized = useSelector(selectAreEntriesInitialized)
  const settingsAreInitialized = useSelector(selectAreSettingsInitialized)

  const entries = useSelector(selectEntries)
  const settings = useSelector(selectSettingsById)

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
