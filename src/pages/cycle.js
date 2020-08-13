import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { navigate } from "gatsby"
import { Router } from "@reach/router"

import {
  selectIsPayingUser,
  selectAuthIsPending,
  selectIsAuthenticated,
} from "../features/auth"
import { selectAreEntriesLoading } from "../features/entries/slice"
import { selectAreSettingsLoading } from "../features/settings/slice"

import { SEO, Loading } from "../features/app"

import CycleIndexPage from "../features/entries/CycleIndexPage"
import CycleEditPage from "../features/entries/CycleEditPage"

const CyclePage = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const authIsPending = useSelector(selectAuthIsPending)

  const entriesAreLoading = useSelector(selectAreEntriesLoading)
  const settingsAreLoading = useSelector(selectAreSettingsLoading)

  const isPayingUser = useSelector(selectIsPayingUser)

  const dataIsLoading = entriesAreLoading || settingsAreLoading

  useEffect(() => {
    if (!authIsPending) {
      if (!isAuthenticated) {
        navigate("/login")
      } else if (!isPayingUser) {
        navigate("/profile?payment=unfinished")
      }
    }
  }, [isAuthenticated, authIsPending, isPayingUser])

  if (!isAuthenticated || !isPayingUser || dataIsLoading) {
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
