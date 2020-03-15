import React, { useState, useEffect, useRef } from "react"
import { TextField } from "@material-ui/core"

import { useDataState, useDataActions } from "../database"

const EntryForm = ({ entryId, onDone, children, variant, className }) => {
  const { entries, settings } = useDataState()
  const { upsertEntry } = useDataActions()

  const entryNote = entries[entryId] ? entries[entryId].note : ""

  const [values, setValues] = useState({ note: entryNote })
  const [placeholder, setPlaceholder] = useState()

  const inputRef = useRef()

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus()
    }
  }, [inputRef])

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
      onDone(event, "reset")
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
    <form
      noValidate
      className={className}
      onReset={handleReset}
      onSubmit={handleSubmit}
    >
      <TextField
        label={entryNote ? "Edit entry" : "Add an entry"}
        multiline
        fullWidth
        inputRef={inputRef}
        placeholder={placeholder}
        color="secondary"
        variant={variant}
        value={values["note"]}
        onChange={handleChange("note")}
        helperText="Use hashtags for things you would like to keep a close eye on."
      />

      {children}
    </form>
  )
}

export default EntryForm
