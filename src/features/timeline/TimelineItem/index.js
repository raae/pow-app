import React from "react"
import PropTypes from "prop-types"

import { makeStyles, fade } from "@material-ui/core"

import Info from "./Info"
import Header from "./Header"
import Entry from "./Entry"
import Predictions from "./Predictions"

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
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
    padding: theme.spacing(0.5, 1),
    // margin: theme.spacing(0, `${theme.shape.borderRadius / 2}px`),
    marginBottom: theme.spacing(1.5),
    // backgroundColor: theme.palette.grey[100],
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
    // backgroundColor: theme.palette.grey[100],
    backgroundColor: fade(
      theme.palette.secondary.main,
      theme.palette.action.hoverOpacity
    ),
    zIndex: "-1",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}))

const TimelineItem = ({ date }) => {
  const classes = useStyles()

  return (
    <article className={classes.root}>
      <Header date={date} className={classes.header} />
      <Info date={date} className={classes.info} />
      <Entry date={date} className={classes.entry} />
      <Predictions date={date} className={classes.predictions} />
    </article>
  )
}

TimelineItem.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
}

export default TimelineItem
