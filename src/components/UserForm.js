import React, { useState } from "react"
import { Link as GatsbyLink } from "gatsby"
import classNames from "classnames"
import {
  Button,
  TextField,
  Checkbox,
  Link,
  FormControlLabel,
  makeStyles,
  Typography,
  Paper,
} from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"

import { useAuthState, useAuthActions } from "../auth"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%", // Fix IE 11 issue.
  },
  standalone: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(4),
  },
  checkbox: {
    marginLeft: 0,
  },
  alert: {
    margin: theme.spacing(3, 0, 1),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
}))

const UserForm = ({ variant, standalone = true, onSubmitFulfilled }) => {
  const classes = useStyles()
  variant = variant.toLowerCase()

  const { isPending: isAuthPending, user } = useAuthState()
  const { signIn, signUp, signOut } = useAuthActions()

  const [error, setError] = useState()
  const [isPending, setIsPending] = useState()

  const [state, setState] = useState({
    username: "",
    password: "",
    rememberMe: "session",
  })

  const handleChange = (name) => (event) => {
    let value = event.target.value
    setError()

    if (name === "rememberMe") {
      value = event.target.checked ? "local" : "session"
    }

    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  const handleSignOut = async (event) => {
    event.preventDefault()
    setIsPending(true)
    const result = await signOut({ redirect: false })
    setError(result.error)
    setIsPending(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsPending(true)

    let result = null
    if (variant === "signup") {
      result = await signUp(state, { redirect: !onSubmitFulfilled })
    } else {
      result = await signIn(state, { redirect: !onSubmitFulfilled })
    }

    if (result.error) {
      setError(result.error)
      setIsPending(false)
    } else if (onSubmitFulfilled) {
      onSubmitFulfilled()
    }
  }

  return (
    <>
      <Paper
        component="form"
        className={classNames(classes.root, {
          [classes.standalone]: standalone,
        })}
        elevation={standalone ? 1 : 0}
        noValidate
        onSubmit={handleSubmit}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          placeholder="unicorn"
          value={state.username}
          onChange={handleChange("username")}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          placeholder="glitter-rainbow-butterfly-kitty"
          value={state.password}
          onChange={handleChange("password")}
          InputLabelProps={{ shrink: true }}
        />
        <FormControlLabel
          className={classes.checkbox}
          control={<Checkbox value="local" color="primary" />}
          label="Remember me"
          value={state.rememberMe}
          onChange={handleChange("rememberMe")}
        />

        {error && (
          <Alert className={classes.alert} severity="error">
            {error.message}
          </Alert>
        )}

        {user && !isPending && (
          <Alert className={classes.alert} severity="warning">
            <div>
              Already signed in as <strong>{user.username}</strong>:{" "}
              <Link component={GatsbyLink} to="/day">
                go to app
              </Link>{" "}
              or{" "}
              <Link type="button" component="button" onClick={handleSignOut}>
                sign out
              </Link>
            </div>
          </Alert>
        )}

        <Button
          className={classes.submit}
          disabled={isAuthPending || isPending || user}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          {variant === "signup" ? "Create account" : "Log In"}
        </Button>

        {variant === "signup" ? (
          <Typography variant="body2" align="right">
            Already have an account?&nbsp;
            <Link to="/login" component={GatsbyLink}>
              Log in
            </Link>
          </Typography>
        ) : (
          <Typography variant="body2" align="right">
            Don't have an account?&nbsp;
            <Link to="/signup" component={GatsbyLink}>
              Sign Up
            </Link>
          </Typography>
        )}
      </Paper>
    </>
  )
}

export default UserForm
