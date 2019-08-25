import React from "react"
import { Container, Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: theme.spacing(3),
  },
}))

const Loading = () => {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <Typography variant="h4" component="p">
        Loading
      </Typography>
    </Container>
  )
}

export default Loading
