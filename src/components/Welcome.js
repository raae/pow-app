import React from "react"
import { Typography, Button, makeStyles } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"

import { useAuthActions, useAuthState } from "../auth"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "30rem",
    padding: theme.spacing(3, 2, 1),
  },
}))

const Welcome = () => {
  const classes = useStyles()
  const { user } = useAuthState()
  const { updateUser } = useAuthActions()

  const userProfileProtected = user.protectedProfile || {}
  const userEmail = user.email || userProfileProtected.stripeEmail

  const userProfile = user.profile || {}

  const handleClose = (name) => (event) => {
    event.preventDefault()

    switch (name) {
      case "welcome":
        updateUser({
          email: userEmail,
          profile: {
            ...userProfile,
            welcomeCompleted: "1",
          },
        })
        break

      case "newsletterOff":
        updateUser({
          email: userEmail,
          profile: {
            ...userProfile,
            newsletter: "0",
          },
        })
        break

      case "newsletterOn":
        updateUser({
          email: userEmail,
          profile: {
            ...userProfile,
            newsletter: "1",
          },
        })
        break

      default:
        break
    }
  }

  if (userProfile.welcomeCompleted && userProfile.newsletter) return null

  return (
    <aside className={classes.root}>
      {!userProfile.welcomeCompleted && (
        <Alert onClose={handleClose("welcome")}>
          <AlertTitle>Welcome</AlertTitle>
          <Typography component="div">
            <p>
              It might not look so interesting now, but keep tracking and your
              personal cycle feed will fill up!
            </p>
            <p>
              You can also go back in time and add notes to get a head start.
            </p>
          </Typography>
        </Alert>
      )}
      {userProfile.welcomeCompleted && (
        <Alert onClose={handleClose("newsletterOff")}>
          <AlertTitle severity="info">Newsletter</AlertTitle>
          <Typography component="div">
            <p>
              POW! is still a young app, and will get lots of love this spring.
              Would you like to keep up by signing up for the newsletter?
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
