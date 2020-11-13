import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import classNames from "classnames"

import {
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  FormGroup,
  FormHelperText,
  makeStyles,
} from "@material-ui/core"

import Alert from "@material-ui/lab/Alert"

import {
  selectMainMensesTag,
  selectMensesTags,
  upsertMensesTags,
} from "./slice"
import { cleanTag } from "../utils/tags"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%", // Fix IE 11 issue.
  },
  standalone: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(4),
  },
  space: {
    marginBottom: theme.spacing(2),
  },
}))

const textFieldProps = {
  color: "secondary",
  variant: "outlined",
  margin: "normal",
}

const PaymentForm = ({ standalone = true, submitLabel }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const mensesTags = useSelector(selectMensesTags)
  const mainMensesTag = useSelector(selectMainMensesTag)

  const [newTag, setNewTag] = useState("")

  const [error, setError] = useState()
  const [isPending, setIsPending] = useState()

  const formDisabled = isPending

  const handleChange = (event) => {
    setError()

    const value = cleanTag(event.target.value)

    setNewTag(value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setIsPending(true)
    const { error } = await dispatch(upsertMensesTags([...mensesTags, newTag]))
    if (error) {
      setError(error)
    }
    setNewTag("")
    setIsPending(false)
  }

  return (
    <>
      <Paper
        component="form"
        className={classNames(classes.root, {
          [classes.standalone]: standalone,
        })}
        elevation={standalone ? 1 : 0}
        noValidate
        onSubmit={handleSubmit}
      >
        {!mainMensesTag && (
          <Typography className={classes.space} color="textSecondary">
            POW! tracks your cycle using hashtags. Input the term you would like
            to use for menstruation.
          </Typography>
        )}
        {error && (
          <Alert className={classes.space} severity="warning">
            {error.message}
          </Alert>
        )}
        {JSON.stringify(mensesTags)}

        <FormGroup row>
          <TextField
            {...textFieldProps}
            label="Add a menstruation tag"
            value={newTag}
            onChange={handleChange}
            placeholder={"period"}
            required
            inputProps={{
              autoCorrect: "off",
              autoCapitalize: "none",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">#</InputAdornment>
              ),
            }}
          />
        </FormGroup>

        <Button
          className={classes.space}
          disabled={formDisabled}
          type="submit"
          variant="contained"
          color="primary"
        >
          {submitLabel ? submitLabel : "Save"}
        </Button>
      </Paper>
    </>
  )
}

export default PaymentForm
