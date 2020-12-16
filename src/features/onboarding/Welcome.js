import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Typography, Button, makeStyles } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"

import { selectUserEmail, updateUser, selectProfile } from "../auth"

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: "30rem",
    // padding: theme.spacing(3, 2, 1),
  },
}))

const Welcome = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const userEmail = useSelector(selectUserEmail)
  const profile = useSelector(selectProfile)

  const welcomeCompleted = Boolean(parseInt(profile.welcomeCompleted))
  const saveToHomeScreen = Boolean(parseInt(profile.welcomeCompleted))

  const handleClose = (name) => (event) => {
    event.preventDefault()
    console.log({name})

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

      case "saveToHomeScreen":
        dispatch(
          updateUser({
            email: userEmail,
            profile: {
              ...profile,
            },
          })
        )
        break

      default:
        break
    }
  }

  if (welcomeCompleted && saveToHomeScreen) return null

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
      {welcomeCompleted && !saveToHomeScreen && (
        <Alert onClose={handleClose("saveToHomeScreen")}>
          <AlertTitle severity="info">Save POW! To Your Home Screen</AlertTitle>
          <Typography component="div">
            <p>
            POW! will feel more app-like if you
            save POW! to your home screen.

            </p>
          </Typography>

        </Alert>
      )}
    </aside>
  )
}

export default Welcome
