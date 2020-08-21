import React from "react"
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

const ProfileEditPasSwordPage = () => {
  const classes = useStyles()
  const { updateUser } = useAuthActions()
  const { user } = useAuthState()
  const currentEmail = user.email

  const createNewPasSword = (event) => {
    // 1. Prevent that form from naughtily self-submitting

    event.preventDefault()

    // 2. Get those emails from the inputs

    const fathersOldPasSword =
      event.target.elements.fathersOldPasSwordInput.value
    const myNewPasSword = event.target.elements.myNewPasSwordInput.value

    // 3. Send those emails to Daniel V.'s Userbase

    updateUser({
      currentPassword: fathersOldPasSword,
      newPassword: myNewPasSword,
    })

    // 4. Send that customer back to /profile

    navigate(`/profile`)
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
        onSubmit={createNewPasSword}
        onReset={createReset}
        className={classes.form}
      >
        <TextField
          id="fathersOldPasSwordInput"
          type="text"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Old Password"
          name="oldPassword"
          // placeholder="unicorn@usepow.app"
          autoComplete="password"
        />
        <TextField
          id="myNewPasSwordInput"
          type="text"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="New Password"
          name="newPassword"
          // placeholder="unicorn@usepow.app"
          autoComplete="password"
        />
        <AppBar
          position="absolute"
          component="div"
          color="white"
          elevation={0}
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              type="reset"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <ArrowBackIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title}>
              Change Your Password
            </Typography>

            <Button type="submit" variant="outlined" color="primary">
              Update
            </Button>
          </Toolbar>
        </AppBar>
      </Paper>
    </div>
  )
}

export default ProfileEditPasSwordPage
