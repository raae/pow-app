import React from "react"

import { InputAdornment, IconButton, makeStyles } from "@material-ui/core"
import EventIcon from "@material-ui/icons/Event"
import DeleteIcon from "@material-ui/icons/Cancel"

import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers"

import DateFnsUtils from "@date-io/date-fns"

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: "3px",
    marginTop: "2px",
  },
  label: {
    width: "104%",
  },
}))

const MensesDateField = ({ onChange, mensesTag, value, ...props }) => {
  const classes = useStyles()

  const handleOnChange = (date) => {
    return onChange({ target: { name: props.name, id: props.id, value: date } })
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        {...props}
        disableToolbar
        fullWidth
        disableFuture={true}
        variant="inline"
        autoOk={true}
        format="MMMM do"
        value={value}
        label={
          <>
            First day of your last, or current,{" "}
            <strong>{mensesTag || "period"}</strong>
          </>
        }
        placeholder="Select date"
        onChange={handleOnChange}
        InputLabelProps={{
          className: classes.label,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EventIcon
                className={classes.icon}
                color="action"
                fontSize="small"
              />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="remove date"
                onClick={(event) => {
                  event.stopPropagation()
                  handleOnChange(null)
                }}
                disabled={!value}
                edge="end"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

export default MensesDateField
