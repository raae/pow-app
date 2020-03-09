import React, { useState, useEffect } from "react"
import { Paper, TextField, makeStyles } from "@material-ui/core"
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
  const { entries, settings } = useDataState()
  const { upsertEntry } = useDataActions()

  const entryNote = entries[entryId] ? entries[entryId].note : ""

  const [values, setValues] = useState({ note: entryNote })
  const [placeholder, setPlaceholder] = useState()

  const RootComponent = standalone ? Paper : "form"

  useEffect(() => {
    const placeholders = [
      `My #${settings.tag || "period"} just started.`,
      `#energetic`,
      `So so #tired`,
      `Feeling #sexy!`,
      `I am #sad and #angry.`,
      `#${settings.tag || "period"} #heavyflow`,
      `Today I am #happy#happy#happy :D`,
      `#PMS maybe`,
      `Such a #great day and so much happened. There was #this and #that and the other #thing.`,
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
  }, [settings.tag])

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
        rows="3"
        placeholder={placeholder}
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
