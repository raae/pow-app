import React from "react"

import { Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
    zIndex: -1,
  },
}))

const EntryNote = ({ note }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant="body2">{note}</Typography>
    </div>
  )
}

export default EntryNote
