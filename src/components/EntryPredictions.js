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
          Common tags for you on this day:
        </Typography>
      ) : (
        <Typography variant="caption">
          No common tags for you on this day.
        </Typography>
      )}
      {predictions.map(({ tag, frequency }) => {
        return (
          <Typography
            key={tag}
            variant="caption"
            style={{ opacity: frequency + 0.3 }}
          >
            #{tag}
          </Typography>
        )
      })}
    </aside>
  )
}

export default EntryPredictions
