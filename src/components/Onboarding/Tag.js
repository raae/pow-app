import React, { useState, useEffect } from "react"

import { TextField, InputAdornment, Typography } from "@material-ui/core"

const placeholders = {
  tag: "period",
  lastStart: null,
  cycleLength: "28",
  menstruationLength: "4",
}

const Tag = ({ values, onChange, textFieldProps }) => {
  const [tag, setTag] = useState(placeholders.tag)

  useEffect(() => {
    setTag(values.tag || placeholders.tag)
  }, [values])

  return (
    <>
      <TextField
        {...textFieldProps}
        label="Your menstruation tag"
        value={values.tag}
        onChange={onChange("tag")}
        placeholder={placeholders.tag}
        required
        inputProps={{
          autoCorrect: "off",
          autoCapitalize: "none",
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">#</InputAdornment>,
        }}
      />

      <Typography component="div" color="textSecondary">
        <p>
          POW! tracks your cycle using hashtags. Input the term you would like
          to use for menstruation.
        </p>
        <p>
          Example <strong>#{tag}</strong> entries:
        </p>
        <ul>
          <li>First day of #{tag}.</li>
          <li>#{tag}</li>
          <li>#{tag} #cramps #tired</li>
        </ul>
      </Typography>
    </>
  )
}

export default Tag
