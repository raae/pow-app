import React from "react"
import { format, isToday } from "date-fns"
import { Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(0),
  },
  day: {
    display: "inline-block",
    fontWeight: theme.typography.fontWeightBold,
  },
  date: {
    textTransform: "none",
  },
}))

const EntryHeader = ({ date }) => {
  const classes = useStyles()
  date = new Date(date)
  const today = isToday(date)
  return (
    <header className={classes.root}>
      <Typography component="h1" className={classes.day} variant="overline">
        {today ? "today" : format(date, "EEEE")}
      </Typography>{" "}
      <Typography className={classes.date} variant="overline">
        {format(date, "LLLL do")}
      </Typography>
    </header>
  )
}

export default EntryHeader
