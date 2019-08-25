import React, { useState } from "react"
import {
  IconButton,
  TextField,
  InputAdornment,
  makeStyles,
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import CancelIcon from "@material-ui/icons/Cancel"

const useStyles = makeStyles((theme) => ({
  form: {
    display: "inline",
  },
  cancelButton: {
    "& svg": {
      fontSize: "1rem",
    },
  },
}))

const Form = ({ onTagSubmit, onTagCancel }) => {
  const classes = useStyles()
  const [tag, setTag] = useState("")

  const onSubmit = (event) => {
    event.preventDefault()
    onTagSubmit(tag)
    setTag("")
  }

  const cancel = () => {
    onTagCancel()
    setTag("")
  }

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <TextField
        id="add-tag"
        autoFocus={true}
        className={classes.textField}
        value={tag}
        margin="none"
        onChange={(event) => setTag(event.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                className={classes.cancelButton}
                edge="end"
                aria-label="Cancel adding tag"
                onClick={cancel}
              >
                <CancelIcon></CancelIcon>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  )
}

const TagForm = ({ onAddTag }) => {
  const [isAdding, setIsAdding] = useState()

  const onTagSubmit = (tag) => {
    if (tag) {
      onAddTag(tag)
    }
    setIsAdding(false)
  }

  return isAdding ? (
    <Form
      onTagSubmit={onTagSubmit}
      onTagCancel={() => setIsAdding(false)}
    ></Form>
  ) : (
    <IconButton
      onClick={() => setIsAdding(true)}
      size="small"
      aria-label="Add tag"
    >
      <AddIcon></AddIcon>
    </IconButton>
  )
}

export default TagForm
