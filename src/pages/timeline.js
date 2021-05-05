import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { navigate } from "gatsby"
import { Router } from "@reach/router"

import { useAuth } from "../features/auth"
import { useSubscription } from "../features/user"
import { selectAreEntriesLoading } from "../features/entries"
import { selectAreSettingsLoading } from "../features/settings"
import { TimelineIndexPage, TimelineEditPage } from "../features/timeline"

import { Seo, Loading } from "../features/app"

const CyclePage = () => {
  const { isAuthenticated, isAuthPending } = useAuth()
  const { isSubscribed } = useSubscription()

  const entriesAreLoading = useSelector(selectAreEntriesLoading)
  const settingsAreLoading = useSelector(selectAreSettingsLoading)

  const dataIsLoading = entriesAreLoading || settingsAreLoading

  useEffect(() => {
    if (isAuthenticated && !isSubscribed) {
      navigate("/profile?payment=unfinished")
    }
  }, [isAuthenticated, isSubscribed])

  if (isAuthPending || dataIsLoading) {
    return (
      <>
        <Seo title="Loading..." />
        <Loading fullScreen />
      </>
    )
  }

  return (
    <>
      <Seo title="Cycle" />
      <Router basepath="/timeline">
        <TimelineIndexPage path="/" />
        <TimelineIndexPage path=":entryId" />
        <TimelineEditPage path=":entryId/edit" />
      </Router>
    </>
  )
}

export default CyclePage
