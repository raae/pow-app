import React, { useState, useRef, useEffect } from "react"
import { Container, makeStyles, TextField } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  form: {
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
}))

const DEFAULT_ENTRY = {
  note: "",
  date: "",
}

const EntryForm = ({ entriesByDate = {}, handleSubmitEntry }) => {
  const classes = useStyles()
  const entryInputRef = useRef()
  const noteRef = useRef()
  const [entry, setEntry] = useState(DEFAULT_ENTRY)

  const handleChange = (name) => (event) => {
    setEntry({ ...entry, [name]: event.target.value })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    handleSubmitEntry(entry)
    setEntry(DEFAULT_ENTRY)
    entryInputRef.current.blur()
  }

  useEffect(() => {
    if (!entry.date) return

    const excitingEntry = entriesByDate[entry.date]
    if (excitingEntry) {
      noteRef.current = excitingEntry.note
      setEntry(excitingEntry)
    } else if (entry.note === noteRef.current) {
      setEntry({ ...entry, note: DEFAULT_ENTRY.note })
      entryInputRef.current.focus()
    } else {
      entryInputRef.current.focus()
    }
  }, [entry.date])

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
