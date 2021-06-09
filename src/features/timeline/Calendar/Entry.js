import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { useSelector } from "react-redux"
import { ButtonBase, Tooltip } from "@material-ui/core"
import { Brightness1 as BrightnessIcon } from "@material-ui/icons"
import { useTheme } from "@material-ui/core/styles"
import { entryIdFromDate } from "../../utils/days"
import { selectEntryNote } from "../../entries"

const Entry = ({ date, isPast, isToday, className }) => {
  const theme = useTheme()
  const entryId = entryIdFromDate(date)
  const editPath = `/calendar/${entryId}/edit`
  const entryNote = useSelector((state) => selectEntryNote(state, { date }))
  const isEditable = isPast || isToday

  if (!isEditable) return null

  return (
    <ButtonBase component={Link} to={editPath} className={className}>
      {entryNote
        ? entryNote.split(" ").map((note) => (
            <Tooltip title={note} aria-label={note}>
              <BrightnessIcon
                style={{ fill: theme.palette.info.main, width: 8 }}
              />
            </Tooltip>
          ))
        : null}
    </ButtonBase>
  )
}

Entry.propTypes = {
  date: PropTypes.instanceOf(Date),
  isPast: PropTypes.bool.isRequired,
  isToday: PropTypes.bool.isRequired,
}

export default Entry
