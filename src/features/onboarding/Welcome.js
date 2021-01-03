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
  const addToHomeScreenCompleted = Boolean(parseInt(profile.addToHomeScreenCompleted))
  //  const newsletterCompleted = profile.newsletter !== undefined

  const handleClose = (name) => (event) => {
    event.preventDefault()
    console.log({name});
    switch (name) {
      case "welcome": {
        dispatch(
          updateUser({
            email: userEmail,
            profile: {
              ...profile,
              welcomeCompleted: "1",
            },
          })
        )
        break;
      }

      case "addToHomeScreen": {
        // Don't do some A2HS magic
        alert(`You have added POW! to your home screen! Or not.`)

        break
      }

      default:
        break
    }
  }

  if (welcomeCompleted && addToHomeScreenCompleted) return null

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
      {welcomeCompleted && !addToHomeScreenCompleted && (
        <Alert onClose={handleClose("addToHomeScreen")}>
          <AlertTitle severity="info">Add POW! To Your Home Screen </AlertTitle>
          <Typography component="div">
            <p>
              POW! will feel more app-like if you <a href="https://www.usepow.app/support/install">add POW!
              to your home screen on your phone</a>. Read Benedicte's blogpost if your phone is rude or stubborn.
            </p>

          </Typography>
        </Alert>
      )}
    </aside>
  )
}

export default Welcome
