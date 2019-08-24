import React from "react"

import { Typography, IconButton, Button, makeStyles } from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"

const useStyles = makeStyles((theme) => ({
  note: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  edit: {
    float: "right",
    opacity: 0.8,
  },
  add: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    justifyContent: "flex-end",
    borderRadius: 0,
    opacity: 0.6,
  },
}))

const Note = ({ note }) => {
  const classes = useStyles()
  return (
    <div className={classes.note}>
      <Typography>{note}</Typography>
      <IconButton className={classes.edit} size="small" aria-label="Edit note">
        <EditIcon></EditIcon>
      </IconButton>
    </div>
  )
}

const AddNote = () => {
  const classes = useStyles()

  return (
    <Button
      size="small"
      classes={{
        root: classes.add,
      }}
    >
      Add note
    </Button>
  )
}

const EntryNote = ({ note }) => {
  return note ? <Note note={note}></Note> : <AddNote></AddNote>
}

export default EntryNote
