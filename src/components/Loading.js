import React from "react"
import { CircularProgress, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: `4px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(2),
    background: theme.palette.background.paper,
    minHeight: "100vh",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: theme.spacing(3),
  },
  circle: {
    height: "10vh !important",
    width: "10vh !important",
  },
}))

const Loading = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CircularProgress className={classes.circle} />
    </div>
  )
}

export default Loading
