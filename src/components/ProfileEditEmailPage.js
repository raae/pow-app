import React, { useState } from "react"
import { useAuthActions, useAuthState } from "../auth"
import { navigate } from "gatsby"
import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
  TextField,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "50rem",
    margin: "0 auto",
  },
  form: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    maxWidth: "35em",
  },
  helperText: {
    padding: `0 ${theme.spacing(1)}`,
  },
  appBar: {
    borderTop: `4px solid ${theme.palette.primary.main}`,
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  toolbar: {
    width: "100%",
    maxWidth: "55rem",
    margin: "0 auto",
  },
  title: {
    flexGrow: 1,
  },
}))

const ProfileEditEmailPage = () => {
  const classes = useStyles()
  const { updateUser } = useAuthActions()
  const [error, setError] = useState(false)
  const [status, setStatus] = useState("idle")
  const { user } = useAuthState()
  const currentEmail = user.email

  const createEmail = async (event) => {
    // P.L.A.N. Ruby's Rescue Mission
    // PREVENT & LISTEN
    // AWAIT & NAVIGATE
    // 1. PREVENT Princess Lizabeth from defaultly submitting to Queen Mary 1.'s house arrest

    event.preventDefault()

    // 2. LISTEN for the email adress in Ruby's input,
    // The email adress is Ruby's escape location

    const email = event.target.elements.emailInput.value
    setStatus("pending")

    // 3. AWAIT the adressAnswer from Daniel V.'s Userbase Library

    const adressAnswer = await updateUser({ email: email })
    // Ruby's adressQuestion: "is this email adress invalid?"

    if (adressAnswer.error) {
      setError(adressAnswer.error)
      setStatus("idle")
    } else {
      setError(false)
      setStatus("idle")
      // 4. NAVIGATE Princess Lizabeth safely to the future
      // navigate(`/future`) if the adressAnswer is "not an invalid email adress"
      // navigate(`/{future}`) How do we set it?

      navigate(`/profile`)
    }
  }

  const createReset = (event) => {
    event.preventDefault()
    navigate(`/profile`)
  }

  return (
    <div className={classes.root}>
      <Toolbar />

      <Paper
        component="form"
        onSubmit={createEmail}
        onReset={createReset}
        className={classes.form}
      >
        <TextField
          disabled={status === "pending"}
          error={Boolean(error)}
          id="emailInput"
          type="text"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="New email"
          name="email"
          // placeholder="unicorn@usepow.app"
          autoComplete="email"
          helperText={
            <>
              {error && error.message}
              Your current POW! email is <strong>{currentEmail}</strong>.
            </>
          }
        />

        <AppBar
          position="absolute"
          component="div"
          color="inherit"
          elevation={0}
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              disabled={status === "pending"}
              type="reset"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <ArrowBackIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title}>
              Change email
            </Typography>

            <Button
              disabled={status === "pending"}
              type="submit"
              variant="outlined"
              color="primary"
            >
              Update
            </Button>
          </Toolbar>
        </AppBar>
      </Paper>
    </div>
  )
}

export default ProfileEditEmailPage
