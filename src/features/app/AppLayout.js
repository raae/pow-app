import React from "react"
import { Container, Divider, makeStyles } from "@material-ui/core"

import AppHeader from "./AppHeader"
import AppFooter from "./AppFooter"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > main": {
      maxWidth: "50rem",
      marginTop: "2rem",
      padding: theme.spacing(0, 3),
    },
    "& > footer": {
      maxWidth: "50rem",
      "& hr": {
        display: "inline-block",
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
        width: theme.spacing(5),
        border: `2px solid ${theme.palette.primary.main}`,
      },
    },
  },
  content: {
    maxWidth: "32rem",
  },
}))

const AppLayout = ({ children, toolbar }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppHeader toolbar={toolbar} />

      <Container component="main">
        <div className={classes.content}>{children}</div>
      </Container>

      <Container component="footer">
        <Divider />
        <AppFooter />
      </Container>
    </div>
  )
}

export default AppLayout
