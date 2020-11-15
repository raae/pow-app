import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  TextField,
  InputAdornment,
  FormGroup,
  FormHelperText,
  makeStyles,
} from "@material-ui/core"

import Alert from "@material-ui/lab/Alert"

import { addMensesTag, selectMainMensesTag } from "./slice"
import { cleanTag } from "../utils/tags"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%", // Fix IE 11 issue.
  },
  helper: {
    paddingLeft: theme.spacing(2),
  },
}))

const textFieldProps = {
  color: "secondary",
  variant: "outlined",
  margin: "normal",
}

const SettingsMensesTagForm = ({
  component: Component = "form",
  onDone,
  children,
}) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const mainMensesTag = useSelector(selectMainMensesTag)
  const [newTag, setNewTag] = useState("")

  const [error, setError] = useState()
  const [isPending, setIsPending] = useState()

  const handleChange = (event) => {
    setError()

    const value = cleanTag(event.target.value)

    setNewTag(value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setIsPending(true)
    const { error } = await dispatch(addMensesTag({ tag: newTag }))
    if (error) {
      setError(error)
    } else {
      setNewTag("")
      setIsPending(false)
      onDone && onDone()
    }
  }

  const handleReset = () => {
    setNewTag("")
    onDone && onDone()
  }

  return (
    <Component
      onSubmit={!isPending && newTag && handleSubmit}
      onReset={!isPending && handleReset}
      title="Menstruation tag"
      className={classes.root}
    >
      {error && <Alert severity="warning">{error.message}</Alert>}

      <FormGroup>
        <TextField
          {...textFieldProps}
          label={
            mainMensesTag
              ? "Change your chosen menstruation tag"
              : "Your menstruation tag"
          }
          value={newTag}
          onChange={handleChange}
          required
          inputProps={{
            autoCorrect: "off",
            autoCapitalize: "none",
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">#</InputAdornment>,
          }}
        />
        {mainMensesTag && (
          <FormHelperText className={classes.helper}>
            Your current menstruation tag: <strong>#{mainMensesTag}</strong>
          </FormHelperText>
        )}
      </FormGroup>

      {children}
    </Component>
  )
}

export default SettingsMensesTagForm
