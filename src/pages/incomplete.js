import React, { useEffect, useState } from "react"
import { Box, Button, Typography } from "@material-ui/core"
import { navigate } from "gatsby"
import { useDispatch, useSelector } from "react-redux"
import { selectEntries, upsertEntry } from "../features/entries"
import { selectMainMensesTag } from "../features/settings"
import LastDateInput from "../features/onboarding/Onboarding/LastDateInput"
import { AppLayout, AppMainToolbar, AppPage } from "../features/app"
import Toast from "../features/app/Toast"

const Incomplete = () => {
  const dispatch = useDispatch()
  const [lastPeriod, setLastPeriod] = useState(new Date())
  const [error, setError] = useState(false)
  const mainMensesTag = useSelector(selectMainMensesTag)
  const entries = useSelector(selectEntries)
  const notHasPlacedPeriod =
    !entries.length || !entries.filter((s) => s.tags.length).length

  useEffect(() => {
    if (!notHasPlacedPeriod) {
      navigate("/timeline")
    }
  })

  const calculatePeriodDate = async () => {
    setError(false)

    try {
      await dispatch(
        upsertEntry(lastPeriod, {
          note: `#${mainMensesTag}`,
        })
      )
      navigate("/timeline")
    } catch (e) {
      setError(true)
    }
  }
  console.log(error)
  return (
    <AppLayout>
      <AppMainToolbar>
        <Typography variant="h6" component="h1">
          Oh no
        </Typography>
      </AppMainToolbar>
      <AppPage withPaper>
        <p>
          Seems you have not yet told us when your last period was and
          unfortunately we need that to calculate the next one.
        </p>
        <p>No rush, please tell us whenever you can.</p>
        <Box mt={4}>
          <LastDateInput value={lastPeriod} onChange={setLastPeriod} />
          <Box mt={2}>
            <Button
              onClick={calculatePeriodDate}
              color="secondary"
              variant="contained"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </AppPage>
      <Toast open={error}>There has been a problem adding your date</Toast>
    </AppLayout>
  )
}

export default Incomplete
