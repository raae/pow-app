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

const Cycle = ({
  lastMensesDate,
  onChangeLastMensesDate,
  initialCycleLength,
  onChangeInitialCycleLength,
}) => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.cycle}>
        <LastDateInput
          value={lastMensesDate}
          onChange={onChangeLastMensesDate}
        />

        <DaysBetweenInput
          onChange={onChangeInitialCycleLength}
          value={initialCycleLength}
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
