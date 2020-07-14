import React from "react"

import { entryIdFromDate, makeDate, intervalAfterDate } from "../utils/days"

import BrandLayout from "./BrandLayout"
import DaySummary from "./DaySummary"
import Forecast from "./Forecast"
import DatePicker from "./DatePicker"
import Welcome from "./Welcome"
import { useSelector } from "react-redux"

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
