import React from "react"
import PropTypes from "prop-types"
import { Typography } from "@material-ui/core"
import { format } from "date-fns"

const Empty = ({ date, className }) => {
  return (
    <Typography className={className} variant="body2" color="textSecondary">
      — {format(date, "EEEE, MMMM do")}
    </Typography>
  )
}

Empty.propTypes = {}

export default Empty
