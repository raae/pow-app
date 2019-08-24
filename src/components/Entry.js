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

const Entry = ({ entry }) => {
  const classes = useStyles()
  entry.tags = ["exhausted"]

  if (!entry.date) return null

  const date = new Date(entry.date)

  let tags = [
    { label: "exhausted", confidence: 0.5 },
    { label: "happy", confidence: 0.7 },
    { label: "period", confidence: 0.3 },
    { label: "headache", confidence: 0.5 },
  ]

  tags = tags.map((tag) => ({
    ...tag,
    selected: entry.tags.includes(tag.label),
  }))

  return (
    <div className={classes.root}>
      <EntryHeader date={date}></EntryHeader>
      <EntryTags tags={tags}></EntryTags>
      <EntryNote note={entry.note}></EntryNote>
    </div>
  )
}

export default Entry
