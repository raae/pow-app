import { useSelector } from "react-redux"
import { Box, makeStyles, Typography } from "@material-ui/core"
import {
  addDays,
  getDay,
  isFuture as dateIsFuture,
  isToday as dateIsToday,
  isPast as dateIsPast,
} from "date-fns"
import {
  selectHasPredictionsForDate,
  selectPredictedMenstruationForDate,
} from "../../cycle"
import React from "react"
import { entryIdFromDate } from "../../utils/days"
import Header from "./Header"
import Entry from "./Entry"

const useStyles = makeStyles((theme) => ({
  list: { listStyle: "none" },
  day: {
    minHeight: 100,
    background: theme.palette.grey[200],
    border: (props) =>
      props.isPeriod
        ? `2px solid ${theme.palette.error.light}`
        : `2px solid ${theme.palette.grey[200]}`,
  },
}))

const Day = ({ date, ...props }) => {
  const isPredictedMenstruation = useSelector((state) =>
    selectPredictedMenstruationForDate(state, { date })
  )
  const classes = useStyles({ isPeriod: isPredictedMenstruation })
  const hasPredictions = useSelector((state) =>
    selectHasPredictionsForDate(state, { date })
  )

  const isPast = dateIsPast(date)
  const isFuture = dateIsFuture(date)
  const isToday = dateIsToday(date)
  const itemProps = { date, isFuture, isToday, isPast, isSelected: false }
  const scrollToId = `scrollTo-${entryIdFromDate(addDays(date, 1))}`
  const weekDay = props.isFirstOfMonth ? getDay(date) : null

  const columnsForFirstDay = {
    0: 7,
    1: 0,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
  }

  return (
    <>
      <Box
        component="li"
        py={1}
        ml={0}
        className={classes.list}
        {...props}
        style={{
          gridColumnStart: weekDay ? columnsForFirstDay[weekDay] : null,
        }}
      >
        <div id={scrollToId} />
        <Box
          display="flex"
          alignItems="center"
          justifyContent={
            isFuture && !hasPredictions ? "center" : "space-between"
          }
          className={classes.day}
          flexDirection="column"
          height={"100%"}
          borderRadius={4}
        >
          {isFuture && !hasPredictions ? (
            <Typography variant="body2" color="textSecondary" display="block">
              {date.getDate()}
            </Typography>
          ) : (
            <>
              <Header {...itemProps} />
              <Entry {...itemProps} />
            </>
          )}
        </Box>
      </Box>
    </>
  )
}

export default Day
