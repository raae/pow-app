import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { navigate } from "gatsby"
import { List, IconButton, makeStyles } from "@material-ui/core"
import { Today } from "@material-ui/icons"
import { eachDayOfInterval, addDays, isToday } from "date-fns"
import { makeDate, entryIdFromDate } from "../utils/days"
import { AppLayout, AppMainToolbar, AppPage } from "../app"
import { Welcome } from "../onboarding"
import { selectDaysBetween } from "../cycle"
import TimelineItem from "./TimelineItem"
import DatePicker from "./DatePicker"

const useStyles = makeStyles((theme) => ({
  timeline: {
    "& > *": {
      marginBottom: theme.spacing(3),
    },
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
        </AppMainToolbar>
        <List className={classes.timeline}>
          {range.map((date) => {
            return (
              <TimelineItem key={date} date={date} selectedDate={selectedDate}>
                {isToday(date) && <Welcome key="welcome" />}
              </TimelineItem>
            )
          })}
        </List>
      </AppPage>
    </AppLayout>
  )
}

export default CycleIndexPage
