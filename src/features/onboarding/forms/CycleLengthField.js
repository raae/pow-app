import React from "react"
import { TextField, InputAdornment } from "@material-ui/core"
import { RotateRight as CycleLengthIcon } from "@material-ui/icons"

const MIN_MAX = {
  min: 15,
  max: 60,
}

const PLACEHOLDER = 28

const CycleLengthField = ({
  onChange,
  value,
  mensesTag,
  placeholder = PLACEHOLDER,
  minMax = MIN_MAX,
  ...props
}) => {
  const handleOnChange = (event) => {
    let currentValue = event.target.value
    currentValue = currentValue ? parseInt(currentValue, 10) : ""

    if (currentValue === -1) {
      currentValue = PLACEHOLDER - 1
    } else if (currentValue === 1) {
      currentValue = PLACEHOLDER + 1
    }

    event.target.value = currentValue

    onChange(event)
  }

  return (
    <TextField
      {...props}
      label={
        <>
          Your average <strong>{mensesTag || "period"}</strong> cycle length
        </>
      }
      value={value}
      type="number"
      onChange={handleOnChange}
      placeholder={placeholder.toString()}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <CycleLengthIcon color="action" />
          </InputAdornment>
        ),
        min: minMax.min,
        max: minMax.max,
      }}
    />
  )
}

export default CycleLengthField
