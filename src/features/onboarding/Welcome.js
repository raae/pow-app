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
  const addToHomeScreen = Boolean(parseInt(profile.welcomeCompleted))
  //  const newsletterCompleted = profile.newsletter !== undefined

  const handleClose = (name) => (event) => {
    event.preventDefault()
    console.log({name});
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

      case "addToHomeScreen":
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

      default:
        break
    }
  }

  if (welcomeCompleted && addToHomeScreen) return null

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
      {welcomeCompleted && !addToHomeScreen && (
        <Alert onClose={handleClose("newsletterOff")}>
          <AlertTitle severity="info">Add POW! To Your Home Screen </AlertTitle>
          <Typography component="div">
            <p>
              POW! will feel more app-like if you
              add POW! to your home screen
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
