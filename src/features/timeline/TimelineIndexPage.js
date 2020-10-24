import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { List, makeStyles } from "@material-ui/core"
import { eachDayOfInterval, addDays, isToday } from "date-fns"

import { makeDate, entryIdFromDate } from "../utils/days"

import { AppLayout, AppMainToolbar, AppPage } from "../app"
import { Welcome } from "../onboarding"

import { selectDaysBetween } from "../cycle"

import TimelineItem from "./TimelineItem"
import DatePicker from "./DatePicker"

const useStyles = makeStyles((theme) => ({
  forecast: {
    marginTop: theme.spacing(2),
    width: "80%",
  },
}))

const CycleIndexPage = ({ entryId }) => {
  const classes = useStyles()

  const selectedDate = makeDate(entryId)
  const calculatedDaysBetween = useSelector(selectDaysBetween)

  const range = eachDayOfInterval({
    start: addDays(selectedDate, calculatedDaysBetween * -1.5),
    end: addDays(selectedDate, calculatedDaysBetween * 1.5),
  })

  useEffect(() => {
    const scrollToId = `scrollTo-${entryIdFromDate(selectedDate)}`
    const node = document.getElementById(scrollToId)
    if (!node) return

    node.scrollIntoView({
      block: "start",
    })
  }, [selectedDate])

  return (
    <AppLayout>
      <AppMainToolbar>
        <DatePicker date={selectedDate} />
      </AppMainToolbar>

      <AppPage>
        <List className={classes.forecast}>
          {range.map((date) => {
            return (
              <>
                <TimelineItem
                  key={date}
                  date={date}
                  selectedDate={selectedDate}
                />
                {isToday(date) && <Welcome />}
              </>
            )
          })}
        </List>
      </AppPage>
    </AppLayout>
  )
}

export default CycleIndexPage
