import React from "react"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import { format } from "date-fns"
import { Paper, Typography } from "@material-ui/core"

import {
  selectDaysBetween,
  selectIsDaysBetweenCalculated,
  selectIsDateCurrentCycle,
  selectNextStartDate,
} from "../../cycle"
import { selectMainMensesTag } from "../../settings"

const Info = ({ date, isToday, className }) => {
  const menstruationTag = useSelector(selectMainMensesTag)

  const daysBetween = useSelector(selectDaysBetween)
  const isDaysBetweenCalculated = useSelector(selectIsDaysBetweenCalculated)

  const isCurrentCycle = useSelector((state) =>
    selectIsDateCurrentCycle(state, { date })
  )
  const nextStartDate = useSelector((state) =>
    selectNextStartDate(state, { date })
  )

  if (!isToday || !nextStartDate) return null

  return (
    <Paper elevation={0} className={className}>
      <Typography variant="body2">
        Next <strong>#{menstruationTag}</strong> {!isCurrentCycle && "was"}{" "}
        estimated to arrive{" "}
        <strong>{format(nextStartDate, "EEEE, MMMM do")}</strong>, based on{" "}
        {isDaysBetweenCalculated ? "your average" : "a default"}{" "}
        <strong>{daysBetween || "?"}-day</strong> cycle.{" "}
      </Typography>
    </Paper>
  )
}

Info.propTypes = {
  date: PropTypes.instanceOf(Date),
  isToday: PropTypes.bool,
}

export default Info
