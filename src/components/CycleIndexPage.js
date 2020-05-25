import React from "react"

import { useCycleDayState } from "../cycle"
import { entryIdFromDate, makeDate, intervalAfterDate } from "../utils/days"

import BrandLayout from "./BrandLayout"
import DaySummary from "./DaySummary"
import Forecast from "./Forecast"
import DatePicker from "./DatePicker"
import Welcome from "./Welcome"

const CycleIndexPage = ({ date }) => {
  date = makeDate(date)
  const entryId = entryIdFromDate(date)

  const { daysBetween } = useCycleDayState({
    date: makeDate(entryId),
  })

  const afterInterval = intervalAfterDate(entryId, daysBetween + 3)

  return (
    <BrandLayout variant="app" toolbar={<DatePicker entryId={entryId} />}>
      <DaySummary entryId={entryId} />
      <Welcome />
      <Forecast entryId={entryId} interval={afterInterval} />
    </BrandLayout>
  )
}

export default CycleIndexPage
