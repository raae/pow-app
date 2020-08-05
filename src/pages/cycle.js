import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { navigate } from "gatsby"
import { Router } from "@reach/router"

import {
  selectIsPayingUser,
  selectAuthIsPending,
  selectIsAuthenticated,
} from "../auth"
import { selectAreEntriesLoading } from "../entries/slice"
import { selectAreSettingsLoading } from "../settings/slice"

import SEO from "../app/Seo"
import Loading from "../app/Loading"

import CycleIndexPage from "../entries/CycleIndexPage"
import CycleEditPage from "../entries/CycleEditPage"

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
