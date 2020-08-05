import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Typography, Button, makeStyles } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"

import { selectUserEmail, updateUser, selectProfile } from "../auth"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "30rem",
    padding: theme.spacing(3, 2, 1),
  },
}))

const Welcome = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const userEmail = useSelector(selectUserEmail)
  const profile = useSelector(selectProfile)

  const welcomeCompleted = Boolean(parseInt(profile.welcomeCompleted))
  const newsletter = Boolean(parseInt(profile.newsletter))

  const handleClose = (name) => (event) => {
    event.preventDefault()

    switch (name) {
      case "welcome":
        dispatch(
          updateUser({
            email: userEmail,
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
            email: userEmail,
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
            email: userEmail,
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

  if (welcomeCompleted && newsletter) return null

  return (
    <aside className={classes.root}>
      {!welcomeCompleted && (
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
      {welcomeCompleted && (
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
