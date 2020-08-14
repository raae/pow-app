import React from "react"
import PropTypes from "prop-types"

import { isBefore, isToday, entryIdFromDate } from "../utils/days"

import PastTimelineItem from "./PastTimelineItem"
import { selectEntry } from "../../entries"
import CurrentTimelineItem from "./CurrentTimelineItem"
import FutureTimelineItem from "./FutureTimelineItem"

const TimelineItem = ({ date }) => {
  const entryId = entryIdFromDate(date)
  const entry = useSelector((state) => selectEntry(state, { entryId }))

  if (isToday(date)) {
    return <CurrentTimelineItem {...entry} />
  } else if (isBefore) {
    return <PastTimelineItem {...entry} />
  } else {
    return <FutureTimelineItem {...entry} />
  }
}

TimelineItem.propTypes = {
  date: PropTypes.date,
}

export default TimelineItem
