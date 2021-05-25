import React from "react"
import { TextField, InputAdornment } from "@material-ui/core"

const minMax = {
  min: 15,
  max: 60,
}

const placeholder = 28

const DaysBetweenInput = ({ onChange, value, textFieldProps }) => {
  const handleOnChange = (event) => {
    let currentValue = event.target.value
    currentValue = currentValue ? parseInt(currentValue, 10) : ""

    if (currentValue === -1) {
      currentValue = placeholder - 1
    } else if (currentValue === 1) {
      currentValue = placeholder + 1
    }

    onChange(currentValue)
  }

  return (
    <div>
      <TextField
        {...textFieldProps}
        label="Days between menstruations"
        value={value}
        type="number"
        onChange={handleOnChange}
        placeholder={placeholder}
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">#</InputAdornment>,
          min: minMax.min,
          max: minMax.max,
        }}
      />
    </div>
  )
}

export default DaysBetweenInput
