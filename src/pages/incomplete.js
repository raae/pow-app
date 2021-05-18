import React, { useEffect, useState } from "react"
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core"
import { navigate } from "gatsby"
import { useDispatch, useSelector } from "react-redux"
import { selectAllEntries, upsertEntry } from "../features/entries"
import { addMensesTag, selectMainMensesTag } from "../features/settings"
import LastDateInput from "../features/onboarding/Onboarding/LastDateInput"
import { AppLayout, AppMainToolbar, AppPage } from "../features/app"
import Toast from "../features/app/Toast"
import { TIMELINE } from "../features/navigation"
import { useSubscription } from "../features/user"
import { PaymentForm } from "../features/payment"
import { useAuth } from "../features/auth"

const Incomplete = () => {
  const dispatch = useDispatch()
  const [lastPeriod, setLastPeriod] = useState(new Date())
  const [tag, setTag] = useState()
  const [error, setError] = useState(false)
  const mainMensesTag = useSelector(selectMainMensesTag)
  const entries = useSelector(selectAllEntries)
  const notHasPlacedPeriod =
    !entries.length || !entries.filter((s) => s.tags.length).length
  const { isSubscribed } = useSubscription()

  useEffect(() => {
    if (!notHasPlacedPeriod) {
      navigate(TIMELINE.to)
    }
  })
  const calculatePeriodDate = async (e) => {
    e.preventDefault()
    setError(false)

    if (!mainMensesTag) {
      await dispatch(dispatch(addMensesTag(tag)))
    }

    try {
      await dispatch(
        upsertEntry(lastPeriod, {
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
          <>
            <p>
              Seems you have not yet subscribed to our service, please fill in
              the details below so you can start taking charge of your menstrual
              cycle.
            </p>
            <PaymentForm standalone={false} />
          </>
        ) : (
          <>
            <p>
              Seems you have not yet told us when your last period was and
              unfortunately we need that to calculate the next one.
            </p>
            <p>No rush, please tell us whenever you can.</p>
            <form onSubmit={calculatePeriodDate}>
              <Box mt={4}>
                {!mainMensesTag && (
                  <Box mb={2}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      margin="normal"
                      label="Your menstruation tag"
                      placeholder="period"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      required
                      inputProps={{
                        autoCorrect: "off",
                        autoCapitalize: "none",
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">#</InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                )}
                <LastDateInput value={lastPeriod} onChange={setLastPeriod} />
                <Box mt={2}>
                  <Button type="submit" color="secondary" variant="contained">
                    Calculate
                  </Button>
                </Box>
              </Box>
            </form>
          </>
        )}
      </AppPage>
      <Toast open={error}>There has been a problem adding your date</Toast>
    </AppLayout>
  )
}

export default Incomplete
