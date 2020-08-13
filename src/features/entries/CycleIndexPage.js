import React from "react"
import { useSelector } from "react-redux"

import { entryIdFromDate, makeDate, intervalAfterDate } from "../utils/days"

import { BrandLayout } from "../brand"
import DaySummary from "../entries/DaySummary"
import Forecast from "../entries/Forecast"
import { DatePicker } from "../app"
import Welcome from "../onboarding/Welcome"

import { selectDaysBetween } from "../predictions/slice"

const CycleIndexPage = ({ date }) => {
  date = makeDate(date)
  const entryId = entryIdFromDate(date)

  const calculatedDaysBetween = useSelector(selectDaysBetween)
  const afterInterval = intervalAfterDate(entryId, calculatedDaysBetween + 3)

  return (
    <BrandLayout variant="app" toolbar={<DatePicker entryId={entryId} />}>
      <DaySummary entryId={entryId} />
      <Welcome />
      <Forecast entryId={entryId} interval={afterInterval} />
    </BrandLayout>
  )
}

export default CycleIndexPage
