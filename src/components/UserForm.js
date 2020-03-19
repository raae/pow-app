import React, { useState } from "react"
import classNames from "classnames"
import {
  Button,
  TextField,
  Checkbox,
  Link as MuiLink,
  FormControlLabel,
  makeStyles,
  Typography,
  Paper,
  Grid,
} from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"

import { useAuthState, useAuthActions } from "../auth"
import {
  useSignOutNavItem,
  useAppNavItem,
  useSignInNavItem,
  useSignUpNavItem,
  useBetaNavItem,
} from "./navItems"

import { Link } from "./Link"

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
    margin: theme.spacing(2, 0, 2),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
}))

const UserForm = ({
  variant,
  standalone = true,
  onSubmitFulfilled,
  children,
}) => {
  const classes = useStyles()
  // variant = variant.toLowerCase()

  const { isPending: isAuthPending, user } = useAuthState()
  const { signIn, signUp } = useAuthActions()

  const appNavItem = useAppNavItem()
  const signInNavItem = useSignInNavItem()
  const signUpNavItem = useSignUpNavItem()
  const betaNavItem = useBetaNavItem()

  const [error, setError] = useState()
  const [isPending, setIsPending] = useState()

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    rememberMe: "session",
  })

  const handleChange = (name, email) => (event) => {
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
          label="Username (not email)"
          name="username"
          placeholder="unicorn"
          value={state.username}
          autoComplete="username"
          onChange={handleChange("username")}
          InputLabelProps={{ shrink: true }}
        />
        {variant === "signup" && (
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            placeholder="unicorn@usepow.app"
            value={state.email}
            autoComplete="email"
            onChange={handleChange("email")}
            InputLabelProps={{ shrink: true }}
          />
        )}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete={
            variant === "signup" ? "new-password" : "current-password"
          }
          placeholder="glitter-rainbow-butterfly-kitty"
          value={state.password}
          onChange={handleChange("password")}
          InputLabelProps={{ shrink: true }}
        />
        {children}
      </Paper>
    </>
  )
}

export default UserForm
