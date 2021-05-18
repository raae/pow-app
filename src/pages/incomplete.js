import React, { useEffect, useState } from "react"
import { Typography } from "@material-ui/core"
import { navigate } from "gatsby"
import { useDispatch, useSelector } from "react-redux"
import { selectAllEntries, upsertEntry } from "../features/entries"
import { addMensesTag, selectMainMensesTag } from "../features/settings"
import { AppLayout, AppMainToolbar, AppPage } from "../features/app"
import Toast from "../features/app/Toast"
import { TIMELINE } from "../features/navigation"
import { useSubscription } from "../features/user"
import NoPayment from "../features/profile/Incomplete/NoPayment"
import IncompleteSettings from "../features/profile/Incomplete/IncompleteSettings"

const Incomplete = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(false)
  const mainMensesTag = useSelector(selectMainMensesTag)
  const entries = useSelector(selectAllEntries)
  const notHasPlacedPeriod = !entries.length
  const { isSubscribed } = useSubscription()

  useEffect(() => {
    if (!notHasPlacedPeriod) {
      navigate(TIMELINE.to)
    }
  })

  const onSubmit = async ({ tag, lastPeriod }) => {
    setError(false)

    if (!mainMensesTag) {
      await dispatch(addMensesTag(tag))
    }

    try {
      await dispatch(
        upsertEntry({
          date: lastPeriod,
          note: `#${mainMensesTag}`,
        })
      )
      navigate(TIMELINE.to)
    } catch (e) {
      setError(true)
    }
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
