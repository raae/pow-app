import React, { useState } from "react"
import { Link as GatsbyLink, navigate } from "gatsby"
import {
  Button,
  TextField,
  Checkbox,
  Link,
  FormControlLabel,
  makeStyles,
  Typography,
} from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"

import { useAuthState, useAuthActions } from "../auth"

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
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

const UserForm = ({ variant, onSubmitFulfilled = () => navigate("/app") }) => {
  const classes = useStyles()
  variant = variant.toLowerCase()

  const { isPending: isAuthPending } = useAuthState()
  const { signIn, signUp } = useAuthActions()

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsPending(true)

    let result = null
    if (variant === "signup") {
      result = await signUp(state)
    } else {
      result = await signIn(state)
    }

    if (result.error && result.error.name !== "UserAlreadySignedIn") {
      setError(result.error)
      setIsPending(false)
    } else {
      onSubmitFulfilled()
    }
  }

  return (
    <>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
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

        <Button
          className={classes.submit}
          disabled={isAuthPending || isPending}
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
      </form>
    </>
  )
}

export default UserForm
