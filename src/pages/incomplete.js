import React, { useEffect, useState } from "react"
import { Typography } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { navigate } from "gatsby"
import { upsertEntry, selectAreEntriesLoading } from "../features/entries"
import { useSettings } from "../features/settings"
import { AppLayout, AppMainToolbar, AppPage } from "../features/app"
import Toast from "../features/app/Toast"
import { TIMELINE } from "../features/navigation"
import { useAuth } from "../features/auth"
import { useSubscription } from "../features/user"
import NoPayment from "../features/profile/Incomplete/NoPayment"
import IncompleteSettings from "../features/profile/Incomplete/IncompleteSettings"
import { selectHasMensesStartDate } from "../features/cycle"

import { Seo, Loading } from "../features/app"

const Incomplete = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(false)

  const { isAuthenticated, isAuthPending } = useAuth()
  const { isSubscribed } = useSubscription()
  const {
    mainMensesTag,
    addMensesTag,
    isLoading: settingsIsLoading,
  } = useSettings()

  const entriesAreLoading = useSelector(selectAreEntriesLoading)
  const hasMensesStartDate = useSelector(selectHasMensesStartDate)

  const dataIsLoading = entriesAreLoading || settingsIsLoading
  const isIncomplete = !hasMensesStartDate || !isSubscribed

  const onSubmit = async ({ tag, lastPeriod }) => {
    setError(false)

    if (!mainMensesTag) {
      await addMensesTag(tag)
    }

    try {
      await dispatch(
        upsertEntry({
          date: lastPeriod,
          note: `#${tag}`,
        })
      )
      navigate(TIMELINE.to)
    } catch (e) {
      setError(true)
    }
  }

  useEffect(() => {
    if (isAuthenticated && !dataIsLoading && !isIncomplete) {
      navigate(TIMELINE.to)
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
    <AppLayout>
      <AppMainToolbar>
        <Typography variant="h6" component="h1">
          Just one more step
        </Typography>
      </AppMainToolbar>
      <AppPage withPaper>
        {!isSubscribed ? (
          <NoPayment />
        ) : (
          <IncompleteSettings
            mainMensesTag={mainMensesTag}
            onSubmit={onSubmit}
          />
        )}
      </AppPage>
      <Toast open={error}>
        There has been a problem adding your information
      </Toast>
    </AppLayout>
  )
}

export default Incomplete
