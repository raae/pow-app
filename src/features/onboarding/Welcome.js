import React from "react"
import { Typography, Button, makeStyles } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"

import { useUser } from "../user"

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: "30rem",
    // padding: theme.spacing(3, 2, 1),
  },
}))

const Welcome = () => {
  const classes = useStyles()

  const { user, updateUser } = useUser()

  if (!user) return null

  const welcomeCompleted = parseInt(user?.profile?.welcomeCompleted) > 0
  const newsletterCompleted = parseInt(user?.profile?.newsletter) > 0

  const handleClose = (name) => (event) => {
    event.preventDefault()

    switch (name) {
      case "welcome":
        updateUser({
          profile: {
            welcomeCompleted: "1",
          },
        })
        break

      case "newsletterOff":
        updateUser({
          profile: {
            newsletter: "0",
          },
        })
        break

      case "newsletterOn":
        updateUser({
          profile: {
            newsletter: "1",
          },
        })
        break

      default:
        break
    }
  }

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
