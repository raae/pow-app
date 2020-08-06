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
}))

const LastDateInput = ({ onChange, value, inputProps = {} }) => {
  const classes = useStyles()

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        disableToolbar
        fullWidth
        {...inputProps}
        disableFuture={true}
        variant="inline"
        inputVariant={inputProps.variant}
        autoOk={true}
        format="MMMM do"
        id="date-picker-inline"
        value={value}
        label="First day of your last period"
        placeholder="Select date"
        onChange={onChange}
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
                  onChange(null)
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

export default LastDateInput
