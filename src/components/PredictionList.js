import React, { useRef } from "react"
import { Chip, Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({}))

const PredictionList = ({ predictions = [], onAddTag, ...props }) => {
  predictions = useRef(predictions).current
  const hasPredictions = predictions.length > 0

  return (
    <>
      {hasPredictions ? (
        <Typography variant="caption">
          Around this day in your cycle you usually log:
        </Typography>
      ) : (
        <Typography variant="caption">
          Around this day in your cycle you usually log nothing.
        </Typography>
      )}
      {predictions.map((pred) => {
        return (
          <Chip
            key={pred.label}
            size="small"
            clickable={!!onAddTag}
            onClick={() => onAddTag && onAddTag(pred.label)}
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
