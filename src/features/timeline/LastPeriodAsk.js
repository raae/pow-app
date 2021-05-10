import React, { useState } from "react"
import { Box, Button } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { upsertEntry } from "../entries"
import LastDateInput from "../onboarding/Onboarding/LastDateInput"
import { selectMainMensesTag } from "../settings"

const LastPeriodAsk = () => {
  const dispatch = useDispatch()
  const [lastPeriod, setLastPeriod] = useState(new Date())
  const mainMensesTag = useSelector(selectMainMensesTag)

  const submitPeriodDate = async () => {
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
    <>
      <h2>Oh no</h2>
      <p>
        Seems you have not yet told us when your last period was and
        unfortunately we need that to calculate the next one.
      </p>
      <p>No rush, please tell us whenever you can.</p>
      <Box mt={4}>
        <LastDateInput
          value={lastPeriod}
          onChange={setLastPeriod}
          label="First day of your last or current period "
        />
        <Box mt={2}>
          <Button
            onClick={submitPeriodDate}
            color="secondary"
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default LastPeriodAsk
