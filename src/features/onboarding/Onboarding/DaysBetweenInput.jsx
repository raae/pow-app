import React from "react"
import PropTypes from "prop-types"
import { TextField, InputAdornment } from "@material-ui/core"
import { CYCLE_LENGTH_MIN_MAX, DEFAULT_CYCLE_LENGTH } from "../../settings"

const DaysBetweenInput = ({
  onChange,
  value,
  textFieldProps,
  minMax,
  defaultLength,
}) => {
  const onChangeDaysBetween = (e) => {
    let newValue = e.target.value && parseInt(e.target.value, 10)

    if (newValue === -1) {
      newValue = defaultLength - 1
    } else if (newValue === 1) {
      newValue = defaultLength + 1
    }

    onChange(newValue)
  }

  return (
    <TextField
      {...textFieldProps}
      label="Days between menstruations"
      value={value}
      type="number"
      onChange={onChangeDaysBetween}
      placeholder={`${defaultLength}`}
      min={minMax.min}
      max={minMax.max}
      fullWidth
      InputProps={{
        startAdornment: <InputAdornment position="start">#</InputAdornment>,
      }}
    />
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
