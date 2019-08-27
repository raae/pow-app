import React from "react"
import { Container, Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: theme.spacing(3),

    "& *": {
      fontFamily: `'Seymour One', ${theme.typography.h1.fontFamily}`,
    },
  },
}))

const Loading = () => {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <Typography variant="h4" component="p">
        Loading...
      </Typography>
    </Container>
  )
}

export default Loading
