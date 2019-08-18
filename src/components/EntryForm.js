import React, { useState, useRef } from "react"
import { Container, makeStyles, TextField } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  form: {},
}))

const DEFAULT_ENTRY = {
  note: "",
  date: "",
}

const EntryForm = ({ entries = [], handleSubmitEntry }) => {
  const classes = useStyles()
  const entryInputRef = useRef()
  const [entry, setEntry] = useState(DEFAULT_ENTRY)

  const handleChange = name => event => {
    setEntry({ ...entry, [name]: event.target.value })
  }

  const onSubmit = event => {
    event.preventDefault()
    handleSubmitEntry(entry)
    setEntry(DEFAULT_ENTRY)
    entryInputRef.current.focus()
  }

  return (
    <Container component="form" className={classes.form} onSubmit={onSubmit}>
      <TextField
        id="date"
        label="Day"
        type="date"
        value={entry.date}
        onChange={handleChange("date")}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        inputRef={entryInputRef}
        label="How are you feeling today?"
        placeholder="I feel like ...!"
        // multiline
        fullWidth
        value={entry.note}
        onChange={handleChange("note")}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Container>
  )
}

export default EntryForm
