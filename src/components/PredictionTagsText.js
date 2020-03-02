import React from "react"
import { Typography } from "@material-ui/core"

const PredictionTagsText = ({ tags }) => {
  return tags.map(({ tag, frequency }) => {
    return (
      <Typography
        key={tag}
        display="inline"
        variant="body1"
        style={{ opacity: frequency + 0.3 }}
      >
        #{tag}{" "}
      </Typography>
    )
  })
}

export default PredictionTagsText
