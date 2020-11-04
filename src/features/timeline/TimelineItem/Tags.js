import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { useSelector } from "react-redux"
import { Chip, makeStyles } from "@material-ui/core"

import { selectTagsForDate } from "../../cycle"

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

  const tags = useSelector((state) => selectTagsForDate(state, { date }))

  if (tags.length === 0) return null

  return (
    <aside className={className}>
      {tags
        .sort(({ count: countA }, { count: countB }) => countB - countA)
        .map(({ tag, logged, predicted }) => {
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
              component="span"
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
