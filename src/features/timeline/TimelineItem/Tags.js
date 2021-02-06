import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { useSelector, useDispatch } from "react-redux"
import { Chip, makeStyles } from "@material-ui/core"
import { AddCircle as AddIcon } from "@material-ui/icons"

import { selectTagsForDate } from "../../cycle"
import { selectEntryNote, upsertEntry } from "../../entries"

const useStyles = makeStyles((theme) => ({
  tag: {
    borderStyle: "none",
  },
  predictedTag: {
    borderStyle: "dotted",
  },
  loggedTag: {
    borderColor: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
  },
}))

const Tags = ({ date, className }) => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const entryNote = useSelector((state) => selectEntryNote(state, { date }))
  const tags = useSelector((state) => selectTagsForDate(state, { date }))

  const handleAddTag = (tag) => (event) => {
    event.preventDefault()
    // if note ends with a tag keep adding, if not add a line break.
    const note = `${entryNote} #${tag}`
    dispatch(upsertEntry(date, { note }))
  }

  if (tags.length === 0) return null

  return (
    <aside className={className}>
      {tags
        .sort(({ count: countA }, { count: countB }) => countB - countA)
        .map(({ tag, logged, predicted }) => {
          const addProps = {
            // The api for chips uses delete
            // for the icon added to the right...
            onDelete: handleAddTag(tag),
            deleteIcon: <AddIcon />,
          }
          return (
            <Chip
              className={classNames(classes.tag, {
                [classes.loggedTag]: logged,
                [classes.predictedTag]: predicted,
              })}
              variant="outlined"
              size="small"
              key={tag}
              label={`#${tag}`}
              {...(!logged && addProps)}
            />
          )
        })}
    </aside>
  )
}

Tags.propTypes = {
  date: PropTypes.instanceOf(Date),
}

export default Tags
