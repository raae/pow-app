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
import { useSettings } from "../../settings"
import getMonth from "date-fns/getMonth"

const Info = ({ date }) => {
  const { mainMensesTag } = useSettings()

  const daysBetween = useSelector(selectDaysBetween)
  const isDaysBetweenCalculated = useSelector(selectIsDaysBetweenCalculated)

  const isCurrentCycle = useSelector((state) =>
    selectIsDateCurrentCycle(state, { date })
  )
  const nextStartDate = useSelector((state) =>
    selectNextStartDate(state, { date })
  )
  const isNextPeriodThisMonth = getMonth(nextStartDate) === getMonth(date)

  if (!nextStartDate || !isNextPeriodThisMonth) return null

  return (
    <Typography variant="body2">
      Next <strong>{mainMensesTag}</strong> {!isCurrentCycle && "was"} estimated
      to arrive <strong>{format(nextStartDate, "EEEE, MMMM do")}</strong>, based
      on {isDaysBetweenCalculated ? "your average" : "a default"}{" "}
      <strong>{daysBetween || "?"}-day</strong> cycle.{" "}
    </Typography>
  )
}

Info.propTypes = {
  date: PropTypes.instanceOf(Date),
  isToday: PropTypes.bool,
}

export default Info
