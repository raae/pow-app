import React from "react"
import { format } from "date-fns"
import { Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(0),
  },
  day: {
    fontWeight: theme.typography.fontWeightBold,
  },
  date: {
    textTransform: "none",
  },
}))

const EntryHeader = ({ date }) => {
  const classes = useStyles()
  date = new Date(date)
  return (
    <header className={classes.root}>
      <Typography className={classes.day} variant="overline">
        {format(date, "EEEE")}
      </Typography>{" "}
      <Typography className={classes.date} variant="overline">
        {format(date, "LLLL do")}
      </Typography>
    </header>
  )
}

export default EntryHeader
