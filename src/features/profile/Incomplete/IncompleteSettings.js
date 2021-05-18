import { Box, Button, InputAdornment, TextField } from "@material-ui/core"
import React, { useState } from "react"
import LastDateInput from "../../onboarding/Onboarding/LastDateInput"

const IncompleteSettings = ({ onSubmit, mainMensesTag }) => {
  const [tag, setTag] = useState()
  const [lastPeriod, setLastPeriod] = useState(new Date())
  return (
    <>
      <p>
        Seems you have not yet told us when your last period was and
        unfortunately we need that to calculate the next one.
      </p>
      <p>No rush, please tell us whenever you can.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit({ tag, lastPeriod })
        }}
      >
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
  )
}

export default IncompleteSettings
