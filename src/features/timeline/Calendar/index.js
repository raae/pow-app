import { getYear } from "date-fns"
import React from "react"
import { Box, Typography, makeStyles } from "@material-ui/core"
import Day from "./Day"

const useStyles = makeStyles((theme) => ({
  calendar: {
    display: "grid",
    gridTemplateColumns: `repeat(7, calc(14.2% - ${theme.spacing(2)}px))`,
    gridGap: theme.spacing(2),
    padding: theme.spacing(1),

    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: `repeat(7, calc(14.2% - ${theme.spacing(1)}px))`,
      gridGap: theme.spacing(1),
    },
  },
  weekDays: {
    display: "grid",
    gridTemplateColumns: `repeat(7, calc(14.2% - ${theme.spacing(2)}px))`,
    listStyle: "none",
    gridGap: theme.spacing(2),
    padding: theme.spacing(1),
    "& li": {
      textAlign: "center",
    },
  },
}))

const Calendar = ({ dates }) => {
  const classes = useStyles()
  return (
    <Box>
      <Box
        component="header"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        my={4}
      >
        <Typography pt={2} variant="h6" component="h1">
          {dates[0].toLocaleString("default", { month: "long" })}{" "}
          {getYear(dates[0])}{" "}
        </Typography>
      </Box>
      <>
        <Box component="ul" className={classes.weekDays}>
          <li>Mon</li>
          <li>Tues</li>
          <li>Wed</li>
          <li>Thurs</li>
          <li>Fri</li>
          <li>Sat</li>
          <li>Sun</li>
        </Box>
      </>
      <Box component="ol" className={classes.calendar}>
        {dates.map((date, i) => (
          <Day date={date} isFirstOfMonth={i === 0} />
        ))}
      </Box>
    </Box>
  )
}

export default Calendar
