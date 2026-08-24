import React, { useState } from "react"
import classNames from "classnames"
import {
  Button,
  TextField,
  Typography,
  Paper,
  makeStyles,
} from "@material-ui/core"

import { useAuth } from "../useAuth"
import { SIGN_IN, SIGN_UP, Link } from "../../navigation"

import ErrorAlert from "./ErrorAlert"
import RememberMeInput from "./RememberMe"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%", // Fix IE 11 issue.
    padding: theme.spacing(3, 4),
    "& > .MuiAlert-root": {
      marginTop: theme.spacing(1),
    },
    "& > label": {
      margin: theme.spacing(0),
    },
    "& > button": {
      margin: theme.spacing(2, 0),
    },
  },
}))

const SignInForm = ({ className, redirect, ...props }) => {
  const classes = useStyles()

  const { isAuthPending, error, signIn } = useAuth()

  const [rememberMe, setRememberMe] = useState("local")

  const handleSubmit = (event) => {
    event.preventDefault()

    const username = event.target.elements.usernameInput.value
    const password = event.target.elements.passwordInput.value

    signIn({
      username,
      password,
      rememberMe,
    })
  }

  const disabled = isAuthPending

  return (
    <Paper
      component="form"
      className={classNames(className, classes.root)}
      onSubmit={handleSubmit}
      {...props}
    >
      <TextField
        disabled={disabled}
        id="usernameInput"
        variant="outlined"
        margin="normal"
        label="Username (not email)"
        name="username"
        placeholder="unicorn"
        autoComplete="username"
        InputLabelProps={{ shrink: true }}
        required
        fullWidth
      />

      <TextField
        disabled={disabled}
        id="passwordInput"
        variant="outlined"
        margin="normal"
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="glitter-rainbow-butterfly-kitty"
        InputLabelProps={{ shrink: true }}
        required
        fullWidth
      />

      <RememberMeInput
        disabled={disabled}
        value={rememberMe}
        onChange={(value) => setRememberMe(value)}
      />

      <ErrorAlert error={error} />

      <Button
        disabled={disabled}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        {SIGN_IN.label}
      </Button>

      <Typography variant="body2" align="right">
        Not registered yet?&nbsp;
        <Link {...SIGN_UP}>{SIGN_UP.primary}</Link>
      </Typography>
    </Paper>
  )
}

export default SignInForm
