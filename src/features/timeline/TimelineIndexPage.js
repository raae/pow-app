import React from "react"
import { useSelector } from "react-redux"
import { List, makeStyles } from "@material-ui/core"

import { makeDate, intervalAfterDate } from "../utils/days"

import { BrandLayout } from "../brand"
import { Welcome } from "../onboarding"

import { selectDaysBetween } from "../cycle"

import ForecastItem from "./TimelineItem"
import DatePicker from "./DatePicker"

const useStyles = makeStyles((theme) => ({
  forecast: {
    maxWidth: "30rem",
  },
}))

const CycleIndexPage = ({ entryId }) => {
  const date = makeDate(entryId)
  const classes = useStyles()

  const calculatedDaysBetween = useSelector(selectDaysBetween)
  const afterInterval = intervalAfterDate(date, calculatedDaysBetween + 3)

  return (
    <BrandLayout variant="app" toolbar={<DatePicker date={date} />}>
      <List className={classes.forecast}>
        <ForecastItem date={date} />
        <Welcome />
        {afterInterval.map((date) => {
          return <ForecastItem key={date} date={date} />
        })}
      </List>
    </BrandLayout>
  )
}

export default CycleIndexPage
