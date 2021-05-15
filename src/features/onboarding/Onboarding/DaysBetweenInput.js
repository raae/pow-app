import React, { useState, useEffect } from "react"
import { TextField, InputAdornment } from "@material-ui/core"

const minMax = {
  min: 15,
  max: 60,
}

const placeholder = "28"

const DaysBetweenInput = ({ onChange, values, textFieldProps }) => {
  const [value, setValue] = useState(values.daysBetween)

  const onChangeDaysBetween = (e) => {
    const currentValue = e.target.value.length
    if (
      currentValue.length > 1 &&
      (parseInt(currentValue) < minMax.min ||
        parseInt(currentValue) > minMax.max)
    ) {
      return
    }
    onChange("daysBetween")(e)
  }

  const onFocus = (e) => {
    if (!value) {
      setValue(placeholder)
    }
  }

  useEffect(() => {
    setValue(values.daysBetween)
  }, [values.daysBetween])

  return (
    <div>
      <TextField
        {...textFieldProps}
        label="Days between menstruations"
        value={value}
        type="number"
        required
        onFocus={onFocus}
        onChange={onChangeDaysBetween}
        placeholder={placeholder}
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">#</InputAdornment>,
        }}
      />
    </div>
  )
}

export default DaysBetweenInput
