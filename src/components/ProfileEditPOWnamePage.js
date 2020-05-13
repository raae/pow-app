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

//async somewhere here look at
// Line 83 in UserForm.js

const ProfileEditnamePage = () => {
  const classes = useStyles()
  const { updateUser } = useAuthActions()
  const { user } = useAuthState()
  const currentUsername = user.username
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState(false)

  const createNewPOWname = async (event) => {
    // P.L.A.N. your eventhandling
    // PREVENT & LISTEN
    // AWAIT & NAVIGATE

    // 1. PREVENT Princess Lizabeth (form) from defaultly submitting to Mary 1.'s house arrest
    event.preventDefault()

    // 2. LISTEN for that email adress from Ruby's input
    const newUsername = event.target.elements.usernameInput.value

    setStatus("pending")
    setError(false)
    // 3.1 AWAIT the result to the question "is that newUsername already in use?" from Daniel V.'s Userbase
    const result = await updateUser({ username: newUsername })

    if (result.error) {
      // 3.2 Try again if Daniel V.'s Userbase says "Error. Your new username is already in use."
      setError(result.error)
      setStatus("idle")
    } else {
      setError(false)
      setStatus("idle")

      // 4. NAVIGATE Princess Lizabeth safely back to (`/profile`) if no error
      navigate(`/profile`)
    }
  }

  const createReset = (event) => {
    event.preventDefault()
    navigate(`/profile`)
  }
  // function handleChange(event) {
  //   setUssername(event.target.value)
  // }
  return (
    <div className={classes.root}>
      <Toolbar />
      <Paper
        component="form"
        onSubmit={createNewPOWname}
        onReset={createReset}
        className={classes.form}
      >
        <label htmlFor="UsernameInput">
          <TextField
            disabled={status === "pending"}
            error={Boolean(error)}
            id="usernameInput"
            type="text"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            autoComplete="username"
            helperText={
              <>
                {error && error.message}
                Your current username is <strong>{currentUsername}</strong>.
              </>
            }

            // onChange={handleChange}
          />
        </label>

        <AppBar
          position="absolute"
          component="div"
          color="white"
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
              Username
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
export default ProfileEditnamePage
