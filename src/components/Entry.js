import React from "react"
import { isFuture } from "date-fns"

import { Container, makeStyles } from "@material-ui/core"

import EntryHeader from "./EntryHeader"
import EntryMain from "./EntryMain"
import EntryNote from "./EntryNote"
import AddTag from "./AddTag"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    zIndex: 1,
  },
}))

const Entry = ({ entry = {}, handleEntryChange }) => {
  const classes = useStyles()
  const date = new Date(entry.date)
  const future = isFuture(date)

  const onChange = (name) => (param) => {
    const updatedEntry = { ...entry }
    updatedEntry[name] = param
    handleEntryChange(updatedEntry)
  }

  const onAddTag = (label) => {
    onChange("tags")([...entry.tags, label])
  }

  return (
    <Container component="article" className={classes.root}>
      <EntryHeader date={entry.date}></EntryHeader>
      <EntryMain
        tags={entry.tags}
        predictions={entry.predictions}
        date={entry.date}
        onTagsChange={onChange("tags")}
      >
        {!future && <AddTag onAddTag={onAddTag}></AddTag>}
      </EntryMain>
      {!future && (
        <EntryNote
          note={entry.note}
          onNoteChange={onChange("note")}
        ></EntryNote>
      )}
    </Container>
  )
}

export default Entry
