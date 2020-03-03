import React, { useState } from "react"
import { Paper, TextField, makeStyles, Button } from "@material-ui/core"
import classNames from "classnames"

import { useDataState, useDataActions } from "../database"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%", // Fix IE 11 issue.
  },
  standalone: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(4),
  },
  space: {
    margin: theme.spacing(3, 0, 3),
  },
}))

const EntryForm = ({ entryId, standalone, onDone, children }) => {
  const classes = useStyles()
  const { entries } = useDataState()
  const { upsertEntry } = useDataActions()
  const entryNote = entries[entryId] ? entries[entryId].note : ""

  const [values, setValues] = useState({ note: entryNote })

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    })
  }

  const handleReset = (event) => {
    event.preventDefault()
    setValues({ note: entryNote })
    if (onDone) {
      onDone(event, "cancel")
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    upsertEntry(entryId, { note: values.note })
    if (onDone) {
      onDone(event, "submit")
    }
  }

  return (
    <Paper
      component="form"
      className={classNames(classes.root, {
        [classes.standalone]: standalone,
      })}
      elevation={standalone ? 1 : 0}
      noValidate
      onReset={handleReset}
      onSubmit={handleSubmit}
    >
      <TextField
        label={entryNote ? "Edit note" : "Add a note"}
        autoFocus={!entryNote}
        multiline
        fullWidth
        color="secondary"
        variant="outlined"
        value={values["note"]}
        onChange={handleChange("note")}
      />

      {children}
    </Paper>
  )
}

export default EntryForm
