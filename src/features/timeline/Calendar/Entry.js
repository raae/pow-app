import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { useSelector } from "react-redux"
import { Typography, ButtonBase, Box } from "@material-ui/core"
import { Add as AddNoteIcon } from "@material-ui/icons"

import { entryIdFromDate } from "../../utils/days"
import { selectEntryNote } from "../../entries"

const Entry = ({ date, isPast, isToday, className }) => {
  const entryId = entryIdFromDate(date)
  const editPath = `/timeline/calendar/${entryId}/edit`
  const entryNote = useSelector((state) => selectEntryNote(state, { date }))
  const isEditable = isPast || isToday

  if (!isEditable) return null

  return (
    <ButtonBase component={Link} to={editPath} className={className}>
      {entryNote ? (
        <Typography variant="body2">{entryNote}</Typography>
      ) : (
        <Box display="flex" alignItems="center">
          <AddNoteIcon fontSize="inherit" />
          <Typography variant="caption">Add note</Typography>
        </Box>
      )}
    </ButtonBase>
  )
}

Entry.propTypes = {
  date: PropTypes.instanceOf(Date),
  isPast: PropTypes.bool.isRequired,
  isToday: PropTypes.bool.isRequired,
}

export default Entry
