import React from "react"

import { useCycleDayState } from "../../cycle"
import { entryIdFromDate, makeDate, intervalAfterDate } from "../../utils/days"

import BrandLayout from "../../components/BrandLayout"
import DaySummary from "../../components/DaySummary"
import Forecast from "../../components/Forecast"
import DatePicker from "../../components/DatePicker"
import Welcome from "../../components/Welcome"

const CyclePage = ({ date }) => {
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

export default CyclePage
