import React, { useState } from "react"
import PropTypes from "prop-types"
import { isFunction } from "lodash"
import {
  TextField,
  InputAdornment,
  FormGroup,
  FormHelperText,
  makeStyles,
} from "@material-ui/core"

import Alert from "@material-ui/lab/Alert"

import { cleanTag } from "../../utils/tags"
import { useSettings } from "../useSettings"
import { MensesTags } from "../MensesTags"

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

export const AddMensesTagForm = ({ title, description, onDone, Component }) => {
  const classes = useStyles()

  const { isLoading, mainMensesTag, mensesTags, addMensesTag } = useSettings()
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

    if (!newTag) {
      onDone()
    } else {
      setIsPending(true)
      const { error } = await addMensesTag(newTag)

      if (error) {
        setError(error)
      } else {
        setNewTag("")
        onDone()
      }

      setIsPending(false)
    }
  }

  const handleReset = () => {
    setNewTag("")
    onDone()
  }

  return (
    <Component
      onSubmit={handleSubmit}
      onReset={handleReset}
      title={title}
      className={classes.root}
      disabled={isPending}
      description={
        isFunction(description)
          ? description({
              isLoading,
              mensesTag: newTag || mainMensesTag,
            })
          : description
      }
    >
      {error && <Alert severity="warning">{error.message}</Alert>}

      <FormGroup>
        <TextField
          {...textFieldProps}
          label={
            mainMensesTag ? "Change your chosen period tag" : "Your period tag"
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
            {mensesTags.length === 1
              ? "Your current period tag: "
              : "Your current and past period tags: "}
            <MensesTags withMainTag />
          </FormHelperText>
        )}
      </FormGroup>
    </Component>
  )
}

AddMensesTagForm.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf(["form"])])
    .isRequired,
  title: PropTypes.string,
  onDone: PropTypes.func,
  description: PropTypes.func,
}

AddMensesTagForm.defaultProps = {
  Component: "form",
  onDone: () => {},
  description: () => {},
}
