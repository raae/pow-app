import React from "react"
import { isFuture as fnsIsFuture, isToday as fnsIsToday } from "date-fns"
import classnames from "classnames"

import {
  Container,
  Paper,
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core"

import EntryHeader from "./EntryHeader"
import EntryNote from "./EntryNote"
import TagForm from "./TagForm"
import TagList from "./TagList"
import EntryPredictions from "./EntryPredictions"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    zIndex: 1,
    "&:first-child": {
      marginTop: theme.spacing(3),
    },

    "&:last-child": {
      marginBottom: theme.spacing(3),
    },
  },
  main: {
    zIndex: 1,
  },
  today: {
    borderColor: theme.palette.primary.light,
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

const Entry = ({ entry = {}, predictions = [], handleEntryChange }) => {
  const classes = useStyles()
  const date = new Date(entry.date)
  const isFuture = fnsIsFuture(date)
  const isToday = fnsIsToday(date)

  const onNoteChange = (note) => {
    const updatedEntry = { ...entry, note }
    handleEntryChange(updatedEntry)
  }

  return (
    <Container component="article" className={classes.root}>
      <EntryHeader date={date} isToday={isToday}></EntryHeader>
      {!isFuture && (
        <Paper
          elevation={isToday ? 3 : 1}
          className={classnames(classes.main, { [classes.today]: isToday })}
        >
          <EntryNote
            note={entry.note}
            isToday={isToday}
            onNoteChange={onNoteChange}
          ></EntryNote>
        </Paper>
      )}
      <EntryPredictions
        predictions={predictions}
        // onAddTag={!isFuture ? onAddTag : null}
      ></EntryPredictions>
    </Container>
  )
}

export default Entry
