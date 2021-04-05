import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { navigate } from "gatsby"
import classNames from "classnames"
import {
  Button,
  TextField,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core"

import { signUp } from "./slice"
import { useAppNavItem, useSignInNavItem, Link } from "../navigation"

import PasswordNote from "./PasswordNote"
import ErrorAlert from "./ErrorAlert"
import RememberMeInput from "./RememberMe"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%", // Fix IE 11 issue.
    padding: theme.spacing(3, 4),
    "& > .MuiAlert-root": {
      margin: theme.spacing(2, 0),
    },
    "& > label": {
      margin: theme.spacing(0),
    },
    "& > button": {
      margin: theme.spacing(2, 0),
    },
  },
  noElevation: {
    padding: 0,
  },
}))

const SignUpForm = ({ className, onSubmitFulfilled, elevation, ...props }) => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const [isPending, setIsPending] = useState()
  const [error, setError] = useState()
  const [rememberMe, setRememberMe] = useState("local")

  const appNavItem = useAppNavItem()
  const signInNavItem = useSignInNavItem()

  const handleSubmit = async (event) => {
    event.preventDefault()

    setIsPending(true)
    setError(null)

    const email = event.target.elements.emailInput.value
    const username = event.target.elements.usernameInput.value
    const password = event.target.elements.passwordInput.value

    const result = await dispatch(
      signUp({ email, username, password, rememberMe })
    )

    if (result.error) {
      setIsPending(false)
      setError(result.error)
    } else {
      if (onSubmitFulfilled) {
        onSubmitFulfilled()
      } else {
        navigate(appNavItem.to)
      }

      setIsPending(false)
    }
  }

  return (
    <Paper
      component="form"
      className={classNames(className, classes.root, {
        [classes.noElevation]: elevation === 0,
      })}
      onSubmit={handleSubmit}
      elevation={elevation}
      {...props}
    >
      <TextField
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
        id="emailInput"
        variant="outlined"
        margin="normal"
        label="Email"
        name="email"
        placeholder="unicorn@usepow.app"
        autoComplete="email"
        InputLabelProps={{ shrink: true }}
        required
        fullWidth
      />

      <TextField
        id="passwordInput"
        variant="outlined"
        margin="normal"
        name="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        placeholder="glitter-rainbow-butterfly-kitty"
        InputLabelProps={{ shrink: true }}
        required
        fullWidth
      />

      <RememberMeInput
        value={rememberMe}
        onChange={(value) => setRememberMe(value)}
      />

      <PasswordNote />

      <ErrorAlert error={error} />

      <Button
        disabled={isPending}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Create account
      </Button>
      <Typography variant="body2" align="right">
        Already have an account?&nbsp;
        <Link {...signInNavItem} />
      </Typography>
    </Paper>
  )
}

export default SignUpForm
