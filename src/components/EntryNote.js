import React, { useState, useEffect } from "react"

import {
  Typography,
  IconButton,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import AddIcon from "@material-ui/icons/Add"

const useStyles = makeStyles((theme) => ({
  note: {
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    whiteSpace: "pre-wrap",
  },
  text: {
    flexGrow: 1,
  },
  edit: {
    float: "right",
    opacity: 0.6,
    marginLeft: theme.spacing(2),
  },
  add: {
    opacity: 0.6,
    justifyContent: "flex-start",
  },
  form: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
  },
  formActions: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: theme.spacing(1),
    "& > *": {
      marginLeft: theme.spacing(2),
    },
  },
}))

const Note = ({ note = "", onEditNote }) => {
  const classes = useStyles()
  return (
    <div className={classes.note}>
      <Typography className={classes.text}>{note}</Typography>
      {note ? (
        <IconButton
          onClick={onEditNote}
          className={classes.edit}
          size="small"
          aria-label="Edit note"
        >
          <EditIcon></EditIcon>
        </IconButton>
      ) : (
        <Button
          fullWidth
          onClick={onEditNote}
          size="small"
          className={classes.add}
        >
          <AddIcon></AddIcon> Add note
        </Button>
      )}
    </div>
  )
}

const NoteForm = ({ note = "", onNoteChange, onClose }) => {
  const classes = useStyles()
  const [value, setValue] = useState(note)
  const [placeholder, setPlaceholder] = useState()

  useEffect(() => {
    const placeholders = [
      "My #period just started.",
      "#energetic",
      "So so #tired",
      "Feeling #sexy!",
      "I am #sad and #angry.",
      "#period #heavyflow",
      "Today I am #happy#happy#happy :D",
      "I think i have #PMS",
    ]

    let index = Math.floor(Math.random() * placeholders.length)

    const tick = () => {
      setPlaceholder(placeholders[index])
      if (index === placeholders.length - 1) {
        index = 0
      } else {
        index++
      }
    }

    const interval = setInterval(tick, 3500)
    tick()

    return () => {
      clearInterval(interval)
    }
  }, [])

  const onSubmit = (event) => {
    event.preventDefault()
    onNoteChange(value)
    onClose()
  }

  const onCancel = () => {
    onClose()
  }

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <TextField
        autoFocus={true}
        label="A note about today"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        helperText="Hashtags are used to predict how you might feel on this day in your next cycle."
        fullWidth
        multiline
        variant="outlined"
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <div className={classes.formActions}>
        <Button size="small" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="small" type="submit" variant="contained" color="primary">
          Save
        </Button>
      </div>
    </form>
  )
}

const EntryNote = ({ note, isToday, onNoteChange }) => {
  const [isEditing, setIsEditing] = useState()

  return isEditing ? (
    <NoteForm
      note={note}
      onNoteChange={onNoteChange}
      onClose={() => setIsEditing(false)}
    ></NoteForm>
  ) : (
    <Note note={note} onEditNote={() => setIsEditing(true)}></Note>
  )
}

export default EntryNote
