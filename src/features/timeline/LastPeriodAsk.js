import React, { useState } from "react"
import { Box, Button, Typography } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { upsertEntry } from "../entries"
import LastDateInput from "../onboarding/Onboarding/LastDateInput"
import { selectMainMensesTag } from "../settings"
import { AppLayout, AppMainToolbar, AppPage } from "../app"

const LastPeriodAsk = () => {
  const dispatch = useDispatch()
  const [lastPeriod, setLastPeriod] = useState(new Date())
  const mainMensesTag = useSelector(selectMainMensesTag)

  const calculatePeriodDate = async () => {
    try {
      await dispatch(
        upsertEntry(lastPeriod, {
          note: `#${mainMensesTag}`,
        })
      )
    } catch (e) {
      // install a toast library?
      // https://react-hot-toast.com/
      console.log(e)
    }
  }
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
    </AppLayout>
  )
}

export default LastPeriodAsk
