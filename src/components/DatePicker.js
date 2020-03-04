import React, { useState } from "react"
import { navigate } from "gatsby"
import { Popover, Button } from "@material-ui/core"
import DropDownIcon from "@material-ui/icons/ArrowDropDownRounded"
import DropUpIcon from "@material-ui/icons/ArrowDropUpRounded"

import { DatePicker as MuiDatePicker } from "@material-ui/pickers"
import { makeDate, entryIdFromDate } from "../utils/days"

const DatePicker = ({ entryId }) => {
  const [anchorEl, setAnchorEl] = useState()
  const handleChangeDate = (date) => {
    navigate(`/day/${entryIdFromDate(date)}`)
    setAnchorEl(null)
  }
  return (
    <div>
      <Button onClick={(event) => setAnchorEl(event.currentTarget)}>
        March <DropDownIcon />
      </Button>
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MuiDatePicker
          color="secondary"
          autoOk
          disableToolbar
          variant="static"
          openTo="date"
          value={makeDate(entryId)}
          onChange={handleChangeDate}
        />
      </Popover>
    </div>
  )
}

export default DatePicker
