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
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: theme.zIndex.modal,
    borderTop: `4px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.background.paper,
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
