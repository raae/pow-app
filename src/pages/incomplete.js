import React, { useState } from "react"
import { Typography } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { navigate } from "gatsby"

import {
  AppLayout,
  AppMainToolbar,
  AppPage,
  Seo,
  Loading,
  Toast,
} from "../features/app"
import { upsertEntry, selectAreEntriesLoading } from "../features/entries"
import { useSettings } from "../features/settings"
import { TIMELINE } from "../features/navigation"
import { useAuth } from "../features/auth"
import { useSubscription } from "../features/user"
import { NoPayment, IncompleteSettings } from "../features/profile"

const Incomplete = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const { isAuthPending } = useAuth()
  const { isSubscribed } = useSubscription()
  const {
    mainMensesTag,
    addMensesTag,
    setInitialCycleLength,
    isLoading: settingsIsLoading,
  } = useSettings()

  const entriesAreLoading = useSelector(selectAreEntriesLoading)
  const dataIsLoading = entriesAreLoading || settingsIsLoading

  const onSubmit = async ({ tag, lastPeriod, initialCycleLength }) => {
    setError(false)
    setIsPending(true)

    const errors = {}

    if (tag) {
      const { error } = await addMensesTag(tag)
      errors.mensesTagError = error
    }

    if (initialCycleLength) {
      const { error } = await setInitialCycleLength(initialCycleLength)
      errors.initialCycleError = error
    }

    if (lastPeriod) {
      const { error } = await dispatch(
        upsertEntry({
          date: lastPeriod,
          note: `#${tag}`,
        })
      )
      errors.lastPeriodError = error
    }

    const firstError =
      errors.mensesTagError ||
      errors.lastPeriodError ||
      errors.initialCycleError

    if (firstError) {
      setError(firstError)
    } else {
      navigate(TIMELINE.to)
    }

    setIsPending(false)
  }

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
            disabled={isPending}
          />
        )}
      </AppPage>
      <Toast open={error}>
        {error.message || "There has been a problem adding your information"}
      </Toast>
    </AppLayout>
  )
}

export default Incomplete
