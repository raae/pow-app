import { Box, Button, InputAdornment, TextField } from "@material-ui/core"
import React, { useState } from "react"
import DaysBetweenInput from "../../onboarding/Onboarding/DaysBetweenInput"
import LastDateInput from "../../onboarding/Onboarding/LastDateInput"
import { cleanTag } from "../../utils/tags"

const Text = ({ mainMensesTag }) => {
  const topLine = !mainMensesTag
    ? "Seems you have not yet told us when your last period was and also what tag you want to use to track it."
    : "Seems you have not yet told us when your last period was and unfortunately we need that to calculate the next one."

  return (
    <Box mb={3}>
      <p>{topLine}</p>
      <p>No rush, please tell us whenever you can.</p>
    </Box>
  )
}

const IncompleteSettings = ({ onSubmit, mainMensesTag, disabled }) => {
  const [tag, setTag] = useState(mainMensesTag || "")
  const [lastPeriod, setLastPeriod] = useState(null)
  const [initialCycleLength, setInitialCycleLength] = useState("")

  return (
    <>
      <Text mainMensesTag={mainMensesTag} />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit({ tag, lastPeriod, initialCycleLength })
        }}
      >
        <TextField
          required
          color="secondary"
          variant="outlined"
          margin="normal"
          label="Your menstruation tag"
          placeholder="period"
          value={tag}
          onChange={(e) => setTag(cleanTag(e.target.value))}
          inputProps={{
            autoCorrect: "off",
            autoCapitalize: "none",
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">#</InputAdornment>,
          }}
        />
        <LastDateInput required value={lastPeriod} onChange={setLastPeriod} />
        <DaysBetweenInput
          value={initialCycleLength}
          onChange={setInitialCycleLength}
          textFieldProps={{ color: "secondary" }}
        />
        <Box mt={2}>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            disabled={disabled || !lastPeriod || !tag}
          >
            Calculate
          </Button>
        </Box>
      </form>
    </>
  )
}

export default IncompleteSettings
