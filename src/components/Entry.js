import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { isFuture, isToday } from "date-fns"
import classnames from "classnames"

import { selectEntryForDate, updateEntry } from "../store/log"
import { selectPredictionsForDate } from "../store/cycle"
import { selectMenstruationTag } from "../store/settings"

import { Container, Paper, makeStyles } from "@material-ui/core"

import EntryHeader from "./EntryHeader"
import EntryNote from "./EntryNote"
import EntryPredictions from "./EntryPredictions"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    zIndex: 1,
  },
  main: {
    zIndex: 1,
  },
  today: {
    borderColor: theme.palette.secondary.light,
    borderWidth: 2,
    borderStyle: "solid",
  },
  predictions: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    background: theme.palette.grey[100],
    "& > *": {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  tags: {
    margin: theme.spacing(3),
    marginBottom: theme.spacing(2),
    "& > *": {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}))

const selectIsMenstruation = (state, { tags = [], predictions = [] }) => {
  const menstruationTag = selectMenstruationTag(state)
  return tags.includes(menstruationTag) || predictions.includes(menstruationTag)
}

const Entry = ({ date }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const entry = useSelector((state) => selectEntryForDate(state, { date }))
  const predictions = useSelector((state) =>
    selectPredictionsForDate(state, { date })
  )
  const isMenstruation = useSelector((state) =>
    selectIsMenstruation(state, {
      tags: entry && entry.tags,
      predictions,
    })
  )

  const onNoteChange = (note) => {
    dispatch(updateEntry({ date, note }))
  }

  return (
    <Container component="article" className={classes.root}>
      <EntryHeader
        date={date}
        isToday={isToday(date)}
        isMenstruation={isMenstruation}
      ></EntryHeader>
      {!isFuture(date) && (
        <Paper
          elevation={isToday(date) ? 3 : 1}
          className={classnames(classes.main, {
            [classes.today]: isToday(date),
          })}
        >
          <EntryNote
            note={entry && entry.note}
            isToday={isToday(date)}
            onNoteChange={onNoteChange}
          ></EntryNote>
        </Paper>
      )}
      <EntryPredictions predictions={predictions}></EntryPredictions>
    </Container>
  )
}

export default Entry
