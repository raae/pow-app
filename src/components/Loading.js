import React from "react"
import classNames from "classnames"
import { CircularProgress, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: theme.spacing(3),
  },
  fullScreen: {
    borderTop: `4px solid ${theme.palette.primary.main}`,
    width: "100vw",
    height: "100vh",
  },
  circle: {
    height: "10vh !important",
    width: "10vh !important",
  },
}))

const Loading = ({ fullScreen = false }) => {
  const classes = useStyles()
  return (
    <div
      className={classNames(classes.root, { [classes.fullScreen]: fullScreen })}
    >
      <CircularProgress className={classes.circle} />
    </div>
  )
}

export default Loading
