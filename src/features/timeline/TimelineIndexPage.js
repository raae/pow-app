import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { navigate } from "gatsby"
import { List, IconButton, makeStyles } from "@material-ui/core"
import { Today, CalendarViewDay } from "@material-ui/icons"
import {
  eachDayOfInterval,
  addDays,
  isToday,
  getMonth,
  getYear,
  getDaysInMonth,
} from "date-fns"
import { makeDate, entryIdFromDate } from "../utils/days"
import { AppLayout, AppMainToolbar, AppPage } from "../app"
import { Welcome } from "../onboarding"
import { selectDaysBetween } from "../cycle"
import TimelineItem from "./TimelineItem"
import DatePicker from "./DatePicker"
import "./temp.css"
import Calendar from "./Calendar"

const useStyles = makeStyles((theme) => ({
  timeline: {
    "& > *": {
      marginBottom: theme.spacing(3),
    },
  },
}))

const CycleIndexPage = ({ entryId }) => {
  const classes = useStyles()
  const [calendarView, setCalendarView] = useState()

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

  const a = range.reduce((acc, curr) => {
    const month = getMonth(curr)
    if (acc[month]) {
      acc[month] = [...acc[month], curr]
    } else {
      acc[month] = [curr]
    }
    return acc
  }, {})

  console.log(a)

  return (
    <AppLayout>
      <AppPage>
        <AppMainToolbar>
          <DatePicker date={selectedDate} />
          <IconButton
            aria-label="Scroll to today"
            onClick={() => navigate(`/timeline/${entryIdFromDate(new Date())}`)}
            style={{ marginLeft: "auto" }}
          >
            <Today />
          </IconButton>
          <IconButton
            aria-label="Scroll to today"
            onClick={() => setCalendarView((c) => !c)}
            style={{ marginLeft: "auto" }}
          >
            <CalendarViewDay />
          </IconButton>
        </AppMainToolbar>
        {calendarView ? (
          Object.keys(a).map((monthNumber) => (
            <Calendar dates={a[monthNumber]} />
          ))
        ) : (
          <List className={classes.timeline}>
            {range.map((date) => {
              return (
                <TimelineItem
                  key={date}
                  date={date}
                  selectedDate={selectedDate}
                >
                  {isToday(date) && <Welcome key="welcome" />}
                </TimelineItem>
              )
            })}
          </List>
        )}
      </AppPage>
    </AppLayout>
  )
}

export default CycleIndexPage
