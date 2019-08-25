import React from "react"
import { isFuture as fnsIsFuture, isToday as fnsIsToday } from "date-fns"
import classnames from "classnames"

import { Container, Paper, makeStyles } from "@material-ui/core"

import EntryHeader from "./EntryHeader"
import EntryNote from "./EntryNote"
import TagForm from "./TagForm"
import TagList from "./TagList"
import PredictionList from "./PredictionList"

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

  const onChange = (name) => (param) => {
    const updatedEntry = { ...entry }
    updatedEntry[name] = param
    handleEntryChange(updatedEntry)
  }

  const onAddTag = (tag) => {
    let changedTags = [tag]
    if (entry.tags) {
      changedTags = [...entry.tags, tag]
    }
    onChange("tags")(changedTags)
  }

  const onRemoveTag = (tagToRemove) => {
    const changedTags = entry.tags.filter((tag) => tag !== tagToRemove)
    onChange("tags")(changedTags)
  }

  return (
    <Container component="article" className={classes.root}>
      <EntryHeader date={entry.date}></EntryHeader>
      <Paper
        elevation={isToday ? 3 : 1}
        className={classnames({ [classes.today]: isToday })}
      >
        <div className={classes.tags}>
          <TagList
            tags={entry.tags}
            onRemoveTag={onRemoveTag}
            variant={isToday ? "default" : "outlined"}
            color={isToday ? "primary" : "default"}
          ></TagList>
          {!isFuture && <TagForm onAddTag={onAddTag}></TagForm>}
        </div>
        <div className={classes.predictions}>
          <PredictionList
            predictions={predictions}
            onAddTag={!isFuture ? onAddTag : null}
          ></PredictionList>
        </div>
      </Paper>
      {!isFuture && (
        <EntryNote
          note={entry.note}
          onNoteChange={onChange("note")}
        ></EntryNote>
      )}
    </Container>
  )
}

export default Entry
