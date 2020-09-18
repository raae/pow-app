import React, { useState } from "react"
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
  const [isPending, setIsPending] = useState()
  const [error, setError] = useState()
  //const currentEmail = useSelector(selectUserEmail)

  const createEmail = async (event) => {
    // 1. Go get that form and prevent it from naughtily self-submitting

    event.preventDefault()

    setIsPending(true)
    setError(null)

    // 2. Listen for those PasSwords from those inputs

    const oldPasSword = event.target.elements.emailInput.value
    const newPasSword = event.target.elements.newPasSwordInput.value

    // 3. Do somethings like, send those PasSwords to Daniel's and  ...'s Userbase

    const { error } = await dispatch(
      updateUser({ currentPassword: oldPasSword, newPassword: newPasSword })
    )

    // 3. Do somethings like, send that customer back to /profile or give alert if error
    if (error) {
      setIsPending(false)
      setError(error)

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
          disabled={isPending}
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
          disabled={isPending}
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
              disabled={isPending}
              type="submit"
              edge="end"
              variant="contained"
              color="primary"
            >
              Update
            </Button>

            <Typography variant="h6" className={classes.title}>
              Change PasSword
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
