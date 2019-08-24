import React from "react"

import { makeStyles } from "@material-ui/core"

import EntryHeader from "./EntryHeader"
import EntryTags from "./EntryTags"
import EntryNote from "./EntryNote"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
}))

const Entry = ({ entry = {} }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <EntryHeader date={entry.date}></EntryHeader>
      <EntryTags tags={entry.tags}></EntryTags>
      <EntryNote note={entry.note}></EntryNote>
    </div>
  )
}

export default Entry
