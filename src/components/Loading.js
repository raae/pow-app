import React from "react"
import { Container, CircularProgress, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
    <Container className={classes.root}>
      <CircularProgress className={classes.circle} />
    </Container>
  )
}

export default Loading
