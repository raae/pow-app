import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { navigate } from "gatsby"
import { Router } from "@reach/router"

import { useAuth } from "../features/auth"
import { useSubscription } from "../features/user"
import { selectAreEntriesLoading } from "../features/entries"
import { useSettings } from "../features/settings"
import { TimelineIndexPage, TimelineEditPage } from "../features/timeline"
import { selectHasMensesStartDate } from "../features/cycle"
import { Seo, Loading } from "../features/app"
import { INCOMPLETE } from "../features/navigation"

const CyclePage = () => {
  const { isAuthenticated, isAuthPending } = useAuth()
  const { isSubscribed } = useSubscription()
  const { isLoading: settingsIsLoading } = useSettings()

  const entriesAreLoading = useSelector(selectAreEntriesLoading)
  const hasMensesStartDate = useSelector(selectHasMensesStartDate)

  const dataIsLoading = entriesAreLoading || settingsIsLoading
  const isIncomplete = !hasMensesStartDate || !isSubscribed

  useEffect(() => {
    if (isAuthenticated && !dataIsLoading && isIncomplete) {
      navigate(INCOMPLETE.to)
    }
  }, [isAuthenticated, dataIsLoading, isIncomplete])

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
