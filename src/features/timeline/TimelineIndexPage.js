import React from "react"
import { useSelector } from "react-redux"
import { List, makeStyles } from "@material-ui/core"

import { makeDate, intervalAfterDate } from "../utils/days"

import { AppDrawerButton, AppLayout, AppToolbar, AppPage } from "../app"
import { Welcome } from "../onboarding"

import { selectDaysBetween } from "../cycle"

import DaySummary from "./DaySummary"
import ForecastItem from "./ForecastItem"
import DatePicker from "./DatePicker"

const useStyles = makeStyles((theme) => ({
  forecast: {
    marginTop: theme.spacing(2),
    width: "80%",
  },
}))

const CycleIndexPage = ({ entryId }) => {
  const date = makeDate(entryId)
  const classes = useStyles()

  const calculatedDaysBetween = useSelector(selectDaysBetween)
  const afterInterval = intervalAfterDate(date, calculatedDaysBetween + 3)

  return (
    <AppLayout>
      <AppToolbar>
        <DatePicker date={date} />
        <AppDrawerButton />
      </AppToolbar>
      <AppPage>
        <DaySummary className={classes.forecast} date={date} />
        <Welcome />
        <List className={classes.forecast}>
          {afterInterval.map((date) => {
            return <ForecastItem key={date} date={date} />
          })}
        </List>
      </AppPage>
    </AppLayout>
  )
}

export default CycleIndexPage
