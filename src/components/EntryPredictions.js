import React from "react"
import { Chip, Typography, makeStyles } from "@material-ui/core"

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
          In the past, on this day, you have tagged:
        </Typography>
      ) : (
        <Typography variant="caption">
          In the past, on this day, you have not tagged anything.
        </Typography>
      )}
      {predictions.map((pred) => {
        return <Chip key={pred} size="small" label={pred} {...props} />
      })}
    </aside>
  )
}

export default EntryPredictions
