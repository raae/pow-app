import React from "react"

import { Typography, makeStyles } from "@material-ui/core"
import LastDateInput from "./LastDateInput"
import DaysBetweenInput from "./DaysBetweenInput"

const useStyles = makeStyles(() => ({
  cycle: {
    display: "inline-block",
    "& > *": {
      minWidth: "12em",
    },
  },
}))

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

        <DaysBetweenInput
          onChange={onChange}
          values={values}
          textFieldProps={textFieldProps}
        />
      </div>
      <Typography component="div" color="textSecondary">
        <p>
          To get you off to a good start it helps to know a little about your
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
