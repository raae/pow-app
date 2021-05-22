import React from "react"
import { Typography, Button, makeStyles } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"

import { useProfile } from "../profile"

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: "30rem",
    // padding: theme.spacing(3, 2, 1),
  },
}))

const Welcome = () => {
  const classes = useStyles()

  const {
    isLoading,
    newsletterStatus,
    welcomeStatus,
    setWelcomeStatus,
    setNewsletterStatus,
  } = useProfile()

  const welcomeCompleted = parseInt(welcomeStatus) > -1
  const newsletterCompleted = parseInt(newsletterStatus) > -1

  const handleClose = (name) => (event) => {
    event.preventDefault()

    switch (name) {
      case "welcome":
        setWelcomeStatus("1")
        break

      case "newsletterOff":
        setNewsletterStatus("0")
        break

      case "newsletterOn":
        setNewsletterStatus("1")
        break

      default:
        break
    }
  }

  if (isLoading) return null
  if (welcomeCompleted && newsletterCompleted) return null

  return (
    <aside className={classes.root}>
      {!welcomeCompleted && (
        <Alert onClose={handleClose("welcome")}>
          <AlertTitle>Welcome</AlertTitle>
          <Typography component="div">
            <p>
              It might not look so interesting now, but keep adding notes and
              your personal timeline will fill up!
            </p>
          </Typography>
        </Alert>
      )}
      {welcomeCompleted && !newsletterCompleted && (
        <Alert onClose={handleClose("newsletterOff")}>
          <AlertTitle severity="info">Newsletter</AlertTitle>
          <Typography component="div">
            <p>
              POW! is still a young app, and will probably change a lot in the
              coming year. Would you like to keep up by signing up for the
              newsletter?
            </p>
          </Typography>
          <Button variant="outlined" onClick={handleClose("newsletterOn")}>
            Yes, please
          </Button>
        </Alert>
      )}
    </aside>
  )
}

export default Welcome
