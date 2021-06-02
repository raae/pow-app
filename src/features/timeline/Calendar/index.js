import { getDay, getDaysInMonth, getYear } from "date-fns"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {
  format,
  addDays,
  isFuture as dateIsFuture,
  isToday as dateIsToday,
  isPast as dateIsPast,
  isSameDay as dateIsSameDay,
} from "date-fns"
import { selectHasPredictionsForDate } from "../../cycle"
import Info from "./Info"
import Header from "./Header"
import Entry from "./Entry"
import Tags from "./Tags"
import { entryIdFromDate } from "../../utils/days"
import { Box, Typography } from "@material-ui/core"

const Calendar = ({ dates }) => {
  console.log(dates)
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
          <Item date={date} />
        ))}
      </ol>
    </div>
  )
}

const Item = ({ date, ...props }) => {
  const hasPredictions = useSelector((state) =>
    selectHasPredictionsForDate(state, { date })
  )

  const isPast = dateIsPast(date)
  const isFuture = dateIsFuture(date)
  const isToday = dateIsToday(date)
  const itemProps = { date, isFuture, isToday, isPast, isSelected: false }
  const scrollToId = `scrollTo-${entryIdFromDate(addDays(date, 1))}`

  return (
    <>
      <Box
        component="li"
        py={1}
        ml={0}
        style={{ listStyle: "none", minHeight: 100, background: "#eaeaea" }}
        {...props}
      >
        <div id={scrollToId} />
        <Box
          display="flex"
          alignItems="center"
          justifyContent={
            isFuture && !hasPredictions ? "center" : "space-between"
          }
          flexDirection="column"
          height={"100%"}
        >
          {isFuture && !hasPredictions ? (
            <Typography variant="body2" color="textSecondary" display="block">
              {date.getDate()}
            </Typography>
          ) : (
            <>
              <Header {...itemProps} />
              <Entry {...itemProps} />
              <Tags {...itemProps} />
            </>
          )}
        </Box>
      </Box>
    </>
  )
}

export default Calendar
