import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { navigate } from "gatsby"
import { Router } from "@reach/router"

import {
  selectAuthUser,
  selectIsPayingUser,
  selectAuthIsPending,
} from "../auth/slice"
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

  const isPayingUser = useSelector(selectIsPayingUser)

  const dataIsInitialized = entriesAreInitialized && settingsAreInitialized

  useEffect(() => {
    if (!authIsPending) {
      if (!user) {
        navigate("/login")
      } else if (!isPayingUser) {
        navigate("/profile?payment=unfinished")
      }
    }
  }, [user, authIsPending, isPayingUser])

  if (!user || !isPayingUser || !dataIsInitialized) {
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
