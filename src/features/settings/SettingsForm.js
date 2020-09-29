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

import { insertSetting, selectMenstruationTag } from "./slice"
import { tagsFromText } from "../utils/tags"

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

  const menstruationTag = useSelector(selectMenstruationTag)

  const [values, setValues] = useState({
    tag: menstruationTag,
  })

  const [error, setError] = useState()
  const [isPending, setIsPending] = useState()

  const formDisabled = isPending || !!menstruationTag
  const changeable = !menstruationTag

  const handleChange = (name) => (event) => {
    setError()

    let value = null

    if (name === "tag") {
      value = event.target.value
      value = tagsFromText("#" + value)[0] || ""
    }

    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setIsPending(true)
    const { error } = await dispatch(insertSetting("tag", values.tag))
    if (error) {
      setError(error)
    }
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
        {!menstruationTag && (
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
        <FormGroup row>
          <TextField
            {...textFieldProps}
            label="Your menstruation tag"
            value={values.tag}
            onChange={handleChange("tag")}
            placeholder={"period"}
            required
            disabled={formDisabled}
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

        {!changeable && (
          <FormHelperText>
            You can not change your menstruation tag at this time. <br /> This
            will be possible shortly.
          </FormHelperText>
        )}

        {changeable && (
          <Button
            className={classes.space}
            disabled={formDisabled}
            type="submit"
            variant="contained"
            color="primary"
          >
            {submitLabel ? submitLabel : "Save"}
          </Button>
        )}
      </Paper>
    </>
  )
}

export default PaymentForm
