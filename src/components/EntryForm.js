import React, { useState } from "react"
import { Paper, TextField, FormHelperText, makeStyles } from "@material-ui/core"
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
}))

const EntryForm = ({ entryId, standalone, onDone, children }) => {
  const classes = useStyles()
  const { entries } = useDataState()
  const { upsertEntry } = useDataActions()
  const entryNote = entries[entryId] ? entries[entryId].note : ""

  const [values, setValues] = useState({ note: entryNote })

  const RootComponent = standalone ? Paper : "form"

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
    <RootComponent
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
        autoFocus
        multiline
        fullWidth
        color="secondary"
        variant="outlined"
        value={values["note"]}
        onChange={handleChange("note")}
        helperText=" Use hashtags for things you would like to keep a close eye on."
      />

      {children}
    </RootComponent>
  )
}

export default EntryForm
