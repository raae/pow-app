import React from "react"
import { Typography, makeStyles } from "@material-ui/core"
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

  const userProfile = user.profile || {}

  const handleClose = (event) => {
    event.preventDefault()
    updateUser({
      profile: {
        ...userProfile,
        welcome_completed: "1",
      },
    })
  }

  if (userProfile.welcome_completed) return null

  return (
    <aside className={classes.root}>
      <Alert onClose={handleClose}>
        <AlertTitle>Welcome</AlertTitle>
        <Typography component="div">
          <p>
            It might not look so interesting now, but keep tracking and your
            personal cycle feed will fill up!
          </p>
          <p>You can also go back in time and add notes to get a head start.</p>
        </Typography>
      </Alert>
    </aside>
  )
}

export default Welcome
