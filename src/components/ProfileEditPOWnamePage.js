import React from "react"
import { useState } from "react"
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
  const [status, setStatus] = React.useState
  const [error, setError] = useState(false)

  const createNewPOWname = async (event) => {
    // Go GET that event and stop the page from fully and naughtily refreshing
    event.preventDefault()

    // LISTEN for CustomerName
    const newUsername = event.target.elements.POWnameInput.value

    // ESCAPE that ({username: myNewPOWname}) to DanielV's Userbase.com

    const result = await updateUser({ username: newUsername })

    if (result.error) {
      setError(result.error)
    } else {
      setError(false)
      // if there is no error inside the incoming result from the userbase backenf
      // EVADE back to (`/profile`) by calling the navigate from Gatsby
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
            disabled={Boolean(error)}
            id="UsernameInput"
            type="text"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            autoComplete="username"
            helperText={
              <>
                Your current username is <strong>{currentUsername}</strong>.
              </>
            }
            // onChange={handleChange}
          />
        </label>
        <div style={{ color: "red" }}>{error}</div>
        <AppBar
          position="absolute"
          component="div"
          color="white"
          elevation={0}
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              disabled={Boolean(error)}
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
              disabled={Boolean(error)}
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
