import React from "react"
import { useDispatch } from "react-redux"
import { Typography, Button, makeStyles } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"

import { updateUser, useUser } from "../user"

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: "30rem",
    // padding: theme.spacing(3, 2, 1),
  },
}))

const Welcome = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { user } = useUser()

  if (!user) return null

  const { email, profile } = user
  const welcomeCompleted = Boolean(parseInt(profile.welcomeCompleted))
  const newsletterCompleted = profile.newsletter !== undefined

  const handleClose = (name) => (event) => {
    event.preventDefault()

    switch (name) {
      case "welcome":
        dispatch(
          updateUser({
            email,
            profile: {
              ...profile,
              welcomeCompleted: "1",
            },
          })
        )
        break

      case "newsletterOff":
        dispatch(
          updateUser({
            email,
            profile: {
              ...profile,
              newsletter: "0",
            },
          })
        )
        break

      case "newsletterOn":
        dispatch(
          updateUser({
            email,
            profile: {
              ...profile,
              newsletter: "1",
            },
          })
        )
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
