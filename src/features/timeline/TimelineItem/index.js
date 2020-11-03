import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import {
  addDays,
  isFuture as dateIsFuture,
  isToday as dateIsToday,
  isPast as dateIsPast,
  isSameDay as dateIsSameDay,
} from "date-fns"
import { makeStyles, fade } from "@material-ui/core"
import classnames from "classnames"

import { entryIdFromDate } from "../../utils/days"
import { selectHasPredictionsForDate } from "../../cycle"

import Empty from "./Empty"
import Info from "./Info"
import Header from "./Header"
import Entry from "./Entry"
import Predictions from "./Predictions"

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  empty: {
    marginLeft: theme.spacing(3),
  },
  scrollTo: {
    position: "absolute",
    // Indicates how much of this entry (the day before selected)
    // should show
    bottom: "2rem",
    width: "100%",
    ...theme.mixins.toolbar,
  },
  header: {
    padding: theme.spacing(0, 1),
    display: "flex",
    justifyContent: "space-between",
    "& strong": {
      fontWeight: theme.typography.fontWeightBold,
    },
  },
  info: {
    padding: theme.spacing(1.5, 2),
    marginBottom: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius * 0.5,
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  entry: {
    padding: theme.spacing(2),
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    "&:hover": {
      backgroundColor: fade(
        theme.palette.action.active,
        theme.palette.action.hoverOpacity
      ),
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "& svg": {
      marginRight: theme.spacing(1),
    },
    "& *": {
      whiteSpace: "pre-line",
    },
  },
  predictions: {
    padding: theme.spacing(1.5),
    margin: theme.spacing(0, `${theme.shape.borderRadius / 2}px`),
    backgroundColor: fade(
      theme.palette.secondary.dark,
      theme.palette.action.hoverOpacity
    ),
    zIndex: "-1",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  isFuture: {},
}))

const TimelineItem = ({ date, selectedDate, children, ...props }) => {
  const classes = useStyles()

  const hasPredictions = useSelector((state) =>
    selectHasPredictionsForDate(state, { date })
  )
  const scrollToId = `scrollTo-${entryIdFromDate(addDays(date, 1))}`
  const isPast = dateIsPast(date)
  const isFuture = dateIsFuture(date)
  const isToday = dateIsToday(date)
  const isSelected = dateIsSameDay(date, selectedDate)
  const itemProps = { date, isFuture, isToday, isPast, isSelected }
  const conditionalClassName = {
    [classes.isFuture]: isFuture,
  }

  // If its in the future and there are no predictions
  // then return something different

  return (
    <>
      <article className={classes.root} {...props}>
        <div id={scrollToId} className={classes.scrollTo} />
        {isFuture && !hasPredictions ? (
          <Empty {...itemProps} className={classes.empty} />
        ) : (
          <>
            <Header {...itemProps} className={classes.header} />
            <Info {...itemProps} className={classes.info} />
            <Entry {...itemProps} className={classes.entry} />
            <Predictions
              {...itemProps}
              className={classnames(classes.predictions, conditionalClassName)}
            />
          </>
        )}
      </article>
      {children}
    </>
  )
}

TimelineItem.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
}

export default TimelineItem
