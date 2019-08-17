import React, { useState, useEffect, useRef } from "react"
import {
  Container,
  makeStyles,
  TextField,
  Typography,
  Card,
  CardContent,
  Button,
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {},
  card: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  deleteButton: {
    marginLeft: "auto",
    display: "block",
  },
}))

const DEFAULT_ENTRY = {
  text: "",
}

const Log = ({
  entries = [],
  isProcessing,
  handleSubmitEntry,
  handleDeleteAll,
}) => {
  const classes = useStyles()
  const entryInputRef = useRef()
  const [entry, setEntry] = useState(DEFAULT_ENTRY)

  const handleChange = name => event => {
    setEntry({ ...entry, [name]: event.target.value })
  }

  const onSubmit = event => {
    if (isProcessing) return

    event.preventDefault()
    handleSubmitEntry({ ...entry, id: Date.now() })
    setEntry(DEFAULT_ENTRY)
  }

  const onDeleteAll = event => {
    if (isProcessing) return

    event.preventDefault()
    handleDeleteAll()
  }

  useEffect(() => {
    if (!isProcessing) {
      console.log()
      entryInputRef.current.focus()
      setEntry(DEFAULT_ENTRY)
    }
  }, [isProcessing])

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <TextField
          inputRef={entryInputRef}
          label="How are you feeling today?"
          placeholder="I feel like ...!"
          // multiline
          fullWidth
          value={entry.text}
          onChange={handleChange("text")}
          margin="normal"
          variant="outlined"
          disabled={isProcessing}
        />
      </form>

      {entries
        .sort((a, b) => b.id - a.id)
        .map(entry => (
          <Card key={entry.id} elevation={0} className={classes.card}>
            <CardContent>
              <Typography variant="body1" component="p">
                {entry.text}
              </Typography>
            </CardContent>
          </Card>
        ))}

      {entries.length > 0 && (
        <Button
          onClick={onDeleteAll}
          disabled={isProcessing}
          type="submit"
          size="small"
          className={classes.deleteButton}
        >
          Delete everything
        </Button>
      )}
    </Container>
  )
}

export default Log
