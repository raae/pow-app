import React, { useState, useEffect } from "react"
import { TextField, InputAdornment } from "@material-ui/core"

const minMax = {
  min: 15,
  max: 60,
}

const placeholder = 28

const DaysBetweenInput = ({ onChange, values, textFieldProps }) => {
  const [value, setValue] = useState(values.daysBetween)

  const onChangeDaysBetween = (e) => {
    const currentValue = parseInt(e.target.value, 10)
    if (currentValue === -1) {
      setValue(placeholder - 1)
    } else if (currentValue === 1) {
      setValue(placeholder + 1)
    } else {
      setValue(currentValue)
    }

    onChange("daysBetween")(value)
  }

  return (
    <div>
      <TextField
        {...textFieldProps}
        label="Days between menstruations"
        value={value}
        type="number"
        onChange={onChangeDaysBetween}
        placeholder={placeholder}
        min={minMax.min}
        max={minMax.max}
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">#</InputAdornment>,
        }}
      />
    </div>
  )
}

export default DaysBetweenInput
