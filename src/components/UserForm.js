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

const UserForm = () => {
  const classes = useStyles()
  // Where are signup, signin props coming from?
  // signin prop must be coming from SignInForm
  // const { signUp, signIn } = this.props;
  const { isPending, error } = useAuthState()
  const { signIn, signUp } = useAuthActions()

  const [state, setState] = useState({
    username: "",
    password: "",
    rememberMe: "session",
  })

  const handleChange = (name) => (event) => {
    let value = event.target.value
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

  const handleSubmit = (event) => {
    event.preventDefault()
    signUp(state).then(() => {
      navigate("/app")
    })
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
          disabled={isPending}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign Up
        </Button>
        <Typography variant="body2" align="right">
          Already have an account?&nbsp;
          <Link to="/login" component={GatsbyLink}>
            Sign In
          </Link>
        </Typography>
      </form>
    </>
  )
}

export default UserForm
