import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { format } from "date-fns"
import { Typography } from "@material-ui/core"

import { selectIsMenstruationForDate } from "../../entries"
import {
  selectCycleDayForDate,
  selectPredictedMenstruationForDate,
} from "../../cycle"

const TimelineHeader = ({ date, isSelected, isToday, isFuture, className }) => {
  const cycleDay = useSelector((state) =>
    selectCycleDayForDate(state, { date })
  )

  const isLoggedMenstruation = useSelector((state) =>
    selectIsMenstruationForDate(state, { date })
  )

  const isPredictedMenstruation = useSelector((state) =>
    selectPredictedMenstruationForDate(state, { date })
  )

  const isMenstruation = isLoggedMenstruation || isPredictedMenstruation

  return (
    <header className={className}>
      <Typography
        variant="overline"
        component={isSelected ? "strong" : "span"}
        color={isToday || isFuture ? "textPrimary" : "textSecondary"}
      >
        {isToday ? "Today" : format(date, "EEEE, MMMM do")}
      </Typography>
      <Typography
        variant="overline"
        component={isMenstruation || isSelected ? "strong" : "span"}
        color={isMenstruation ? "primary" : "textSecondary"}
      >
        Day {cycleDay}
      </Typography>
    </header>
  )
}

TimelineHeader.propTypes = {
  date: PropTypes.instanceOf(Date),
  isSelected: PropTypes.bool.isRequired,
  isToday: PropTypes.bool.isRequired,
  isFuture: PropTypes.bool.isRequired,
}

export default TimelineHeader
