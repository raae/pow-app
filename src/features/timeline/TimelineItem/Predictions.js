import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { useSelector } from "react-redux"
import { Chip, makeStyles, Typography } from "@material-ui/core"

import { selectPredictedTagsForDate } from "../../cycle"

const useStyles = makeStyles((theme) => ({
  tag: {
    borderStyle: "dotted",
  },
  loggedTag: {
    borderColor: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
  },
}))

const Predictions = ({ date, selectedDate, ...props }) => {
  const classes = useStyles()

  const predictedTags = useSelector((state) =>
    selectPredictedTagsForDate(state, { date })
  )

  if (predictedTags.length === 0) return null

  return (
    <aside {...props}>
      {predictedTags.length === 0 && (
        <Typography>No predictions yet.</Typography>
      )}
      {predictedTags
        .sort(({ countA }, { countB }) => countA - countB)
        .map(({ tag, logged }) => {
          return (
            <Chip
              className={classNames(classes.tag, {
                [classes.loggedTag]: logged,
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

Predictions.propTypes = {
  date: PropTypes.instanceOf(Date),
}

export default Predictions
