import React from "react"
import { Paper, Chip, Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({}))

const PredictionList = ({ predictions = [], onAddTag, ...props }) => {
  const classes = useStyles()

  return (
    <>
      <Typography variant="caption">In the past</Typography>
      {predictions.map((pred) => {
        return (
          <Chip
            size="small"
            onClick={() => onAddTag(pred.label)}
            label={pred.label}
            {...props}
          />
        )
      })}
    </>
  )
}

export default PredictionList
