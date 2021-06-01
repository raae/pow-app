import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { navigate } from "gatsby"
import { IconButton, makeStyles } from "@material-ui/core"
import { Today } from "@material-ui/icons"
import { eachDayOfInterval, addDays, isToday } from "date-fns"
import { makeDate, entryIdFromDate } from "../utils/days"
import { AppLayout, AppMainToolbar, AppPage } from "../app"
import { Welcome } from "../onboarding"
import { selectDaysBetween } from "../cycle"
import TimelineItem from "./TimelineItem"
import DatePicker from "./DatePicker"
import { Virtuoso } from "react-virtuoso"

const useStyles = makeStyles((theme) => ({
  root: { paddingRight: "0" },
  page: { maxWidth: "100% !important" },
  itemWrapper: {
    paddingRight: theme.spacing(6),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up("lg")]: {
      maxWidth: 600,
    },
  },
}))

const CycleIndexPage = ({ entryId }) => {
  const classes = useStyles()
  const selectedDate = makeDate(entryId)
  const calculatedDaysBetween = useSelector(selectDaysBetween)

  const range = eachDayOfInterval({
    start: addDays(selectedDate, calculatedDaysBetween * -60),
    end: addDays(selectedDate, calculatedDaysBetween * 60),
  })

  useEffect(() => {
    const scrollToId = `scrollTo-${entryIdFromDate(selectedDate)}`
    const node = document.getElementById(scrollToId)
    if (!node) return

    node.scrollIntoView({
      block: "start",
    })
  }, [selectedDate])

  const Header = () => (
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
  )

  const Item = ({ index }) => {
    const date = range[index]
    return (
      <div className={classes.itemWrapper}>
        <TimelineItem key={date} date={date} selectedDate={selectedDate}>
          {isToday(date) && <Welcome key="welcome" />}
        </TimelineItem>
      </div>
    )
  }

  return (
    <AppLayout mainClassName={classes.page}>
      <AppPage className={classes.root}>
        <Virtuoso
          components={{
            Header,
          }}
          style={{
            height: "calc(100vh - 72px)",
            width: "100%",
          }}
          totalCount={range.length}
          initialTopMostItemIndex={range.findIndex((date) => isToday(date)) - 1}
          itemContent={(index) => <Item index={index} />}
        />
      </AppPage>
    </AppLayout>
  )
}

export default CycleIndexPage
