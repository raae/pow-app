import React, { useState } from "react"
import PropTypes from "prop-types"
import { TextField, InputAdornment } from "@material-ui/core"

import { CYCLE_LENGTH_MIN_MAX, DEFAULT_CYCLE_LENGTH } from "../../settings"

const DaysBetweenInput = ({
  onChange,
  values,
  textFieldProps,
  defaultLength,
  minMax,
}) => {
  const [value, setValue] = useState(values.daysBetween)

  const onChangeDaysBetween = (e) => {
    const currentValue = parseInt(e.target.value, 10)
    if (currentValue === -1) {
      setValue(defaultLength - 1)
    } else if (currentValue === 1) {
      setValue(defaultLength + 1)
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
        placeholder={defaultLength}
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

DaysBetweenInput.propTypes = {
  defaultLength: PropTypes.number,
  minMax: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
  }),
}

DaysBetweenInput.defaultProps = {
  defaultLength: DEFAULT_CYCLE_LENGTH,
  minMax: CYCLE_LENGTH_MIN_MAX,
}
