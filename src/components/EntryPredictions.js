import React from "react"
import { Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    backgroundColor: theme.palette.grey[200],
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    "& > *": {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}))

const EntryPredictions = ({ predictions, onAddTag, ...props }) => {
  const classes = useStyles()

  if (!predictions) return null

  const hasPredictions = predictions.length > 0

  return (
    <aside className={classes.root}>
      {hasPredictions ? (
        <Typography variant="caption">
          In the past, on this day in your cycle:
        </Typography>
      ) : (
        <Typography variant="caption">
          In the past, on this day in your cycle, you have no tags.
        </Typography>
      )}
      {predictions.map((pred, key) => {
        return (
          <Typography key={key} variant="caption">
            #{pred}
          </Typography>
        )
      })}
    </aside>
  )
}

export default EntryPredictions
