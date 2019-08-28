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

const EntryPredictions = ({ predictions = [], onAddTag, ...props }) => {
  const classes = useStyles()
  const hasPredictions = predictions.length > 0

  return (
    <aside className={classes.root}>
      {hasPredictions ? (
        <Typography variant="caption">
          Around this day in your cycle you usually tag:
        </Typography>
      ) : (
        <Typography variant="caption">
          Predictions based on your tags coming soon.
        </Typography>
      )}
      {predictions.map((pred) => {
        return (
          <Chip
            key={pred.label}
            size="small"
            label={pred.label}
            style={{ opacity: pred.confidence }}
            {...props}
          />
        )
      })}
    </aside>
  )
}

export default EntryPredictions
