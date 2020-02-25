import React from "react"

import {
  TextField,
  InputAdornment,
  Typography,
  makeStyles,
} from "@material-ui/core"

import LastDateInput from "./LastDateInput"

const useStyles = makeStyles(() => ({
  cycle: {
    display: "inline-block",
    "& > *": {
      minWidth: "12em",
    },
  },
}))

const placeholders = {
  tag: "period",
  lastStart: null,
  daysBetween: "28",
  menstruationLength: "4",
}

const Cycle = ({ values, onChange, textFieldProps }) => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.cycle}>
        <LastDateInput
          value={values.lastStart}
          onChange={onChange("lastStart")}
          inputProps={textFieldProps}
        />
        <div>
          <TextField
            {...textFieldProps}
            label="Days between menstruations"
            value={values.daysBetween}
            type="number"
            onChange={onChange("daysBetween")}
            placeholder={placeholders.daysBetween}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">#</InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <Typography component="div" color="textSecondary">
        <p>
          To get you of to a good start it helps to know a little about your
          cycle.
        </p>
        <ul>
          <li>POW! will calibrate as you add entries.</li>
          <li>If you are unsure, feel free to skip this section.</li>
        </ul>
      </Typography>
    </>
  )
}

export default Cycle
