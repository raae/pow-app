import React from "react"
import { useSelector, useDispatch } from "react-redux"
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

import { updateUser, selectUserEmail } from "../auth"

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
    flexDirection: "row-reverse",
  },
  title: {
    flexGrow: 1,
  },
}))

const PasSword = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  //const currentEmail = useSelector(selectUserEmail)

  const createEmail = async (event) => {
    // 1. Prevent that form from naughtily self-submitting

    event.preventDefault()

    // 2. Get those PasSword from those inputz

    const oldPasSword = event.target.elements.emailInput.value
    const newPasSword = event.target.elements.newPasSwordInput.value
    console.log()

    // 3. Send that email to Daniel V.'s Userbase

    const { error } = await dispatch(
      updateUser({ currentPassword: oldPasSword, newPassword: newPasSword })
    )

    // 4. Send that customer back to /profile or give alert if error
    if (error) {
      // Something
      // Something
      alert(error.message)
    } else {
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
          id="emailInput"
          type="text"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Old PasSword"
          name="email"
          placeholder="It's your father's PasSword. .... for a more civilized age"
          // autoComplete="email"
        />
        <TextField
          id="newPasSwordInput"
          type="password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="New PasSword"
          name="New PasSword"
          placeholder="New PasSword"
        />

        <AppBar
          position="absolute"
          component="div"
          elevation={0}
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            <Button
              type="submit"
              edge="end"
              variant="contained"
              color="primary"
            >
              Update
            </Button>

            <Typography variant="h6" className={classes.title}>
              Change email
            </Typography>

            <IconButton
              type="reset"
              edge="start"
              color="inherit"
              aria-label="cancel"
            >
              <ArrowBackIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Paper>
    </div>
  )
}

export default PasSword
