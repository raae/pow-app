import React, { useRef } from "react"
import { Paper, Chip, Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({}))

const PredictionList = ({ predictions = [], onAddTag, ...props }) => {
  const classes = useStyles()
  predictions = useRef(predictions).current

  return (
    <>
      <Typography variant="caption">
        Around this day in your cycle you usually log:
      </Typography>
      {predictions.map((pred) => {
        return (
          <Chip
            size="small"
            onClick={() => onAddTag(pred.label)}
            label={pred.label}
            style={{ opacity: pred.confidence }}
            {...props}
          />
        )
      })}
    </>
  )
}

export default PredictionList
