import { getYear } from "date-fns"
import React from "react"
import Info from "./Info"
import { Box, Typography } from "@material-ui/core"
import Day from "./Day"

const Calendar = ({ dates }) => {
  return (
    <div class="calendar">
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
        <Info date={dates[0]} />
      </Box>
      <ol class="day-grid">
        {dates.map((date) => (
          <Day date={date} />
        ))}
      </ol>
    </div>
  )
}

export default Calendar
