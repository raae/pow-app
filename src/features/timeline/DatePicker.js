import React, { useState } from "react"
import { navigate } from "gatsby"
import { Popover, Button } from "@material-ui/core"
import DropDownIcon from "@material-ui/icons/ArrowDropDownRounded"
import { DatePicker as MuiDatePicker } from "@material-ui/pickers"

import { entryIdFromDate, formatDate } from "../utils/days"

const DatePicker = ({ date }) => {
  const [anchorEl, setAnchorEl] = useState()
  const handleChangeDate = (date) => {
    navigate(`/timeline/${entryIdFromDate(date)}`)
    setAnchorEl(null)
  }

  return (
    <div>
      <Button onClick={(event) => setAnchorEl(event.currentTarget)}>
        {formatDate(date, "MMMM")} <DropDownIcon />
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
          value={date}
          onChange={handleChangeDate}
        />
      </Popover>
    </div>
  )
}

export default DatePicker
