import { useSelector } from "react-redux"
import { Box, Typography } from "@material-ui/core"
import {
  addDays,
  isFuture as dateIsFuture,
  isToday as dateIsToday,
  isPast as dateIsPast,
} from "date-fns"
import { selectHasPredictionsForDate } from "../../cycle"
import React from "react"
import { entryIdFromDate } from "../../utils/days"
import Header from "./Header"
import Entry from "./Entry"
import Tags from "./Tags"

const Day = ({ date, ...props }) => {
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

export default Day
