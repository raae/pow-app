import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { format } from "date-fns"
import { Typography } from "@material-ui/core"

import {
  selectCycleDayForDate,
  selectPredictedMenstruationForDate,
} from "../../cycle"

const TimelineHeader = ({ date, isSelected, isToday, isFuture, className }) => {
  const cycleDay = useSelector((state) =>
    selectCycleDayForDate(state, { date })
  )

  const isPredictedMenstruation = useSelector((state) =>
    selectPredictedMenstruationForDate(state, { date })
  )

  const isMenstruation = isPredictedMenstruation

  const textColor = isToday || isFuture ? "textPrimary" : "textSecondary"

  return (
    <header className={className}>
      <Typography
        variant="overline"
        component={isSelected ? "strong" : "span"}
        color={textColor}
        display="block"
      >
        {isToday ? "Today" : date.getDate()}
      </Typography>
      <Typography
        display="block"
        variant="overline"
        component={isMenstruation || isSelected ? "strong" : "span"}
        color={isMenstruation ? "primary" : textColor}
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
