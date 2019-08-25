import React from "react"

import { makeStyles } from "@material-ui/core"

import EntryHeader from "./EntryHeader"
import EntryMain from "./EntryMain"
import EntryNote from "./EntryNote"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    zIndex: 1,
  },
}))

const Entry = ({ entry = {} }) => {
  const classes = useStyles()
  return (
    <article className={classes.root}>
      <EntryHeader date={entry.date}></EntryHeader>
      <EntryMain tags={entry.tags} date={entry.date}></EntryMain>
      <EntryNote note={entry.note}></EntryNote>
    </article>
  )
}

export default Entry
