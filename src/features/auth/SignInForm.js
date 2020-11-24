import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { navigate } from "gatsby"
import classNames from "classnames"
import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Paper,
  makeStyles,
} from "@material-ui/core"

import { signIn } from "./slice"
import { useAppNavItem, useSignUpNavItem } from "../navigation"
import { Link } from "../navigation"

import ErrorAlert from "./ErrorAlert"

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
  radioGroup: {
    marginLeft: theme.spacing(2),
    "& label + label": {
      marginTop: theme.spacing(-1.5),
    },
  },
}))

const SignInForm = ({ className, onSubmitFulfilled, ...props }) => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const [isPending, setIsPending] = useState()
  const [error, setError] = useState()
  const [rememberMe, setRememberMe] = useState("local")

  const appNavItem = useAppNavItem()
  const signUpNavItem = useSignUpNavItem()

  const handleSubmit = async (event) => {
    event.preventDefault()

    setIsPending(true)
    setError(null)

    const username = event.target.elements.usernameInput.value
    const password = event.target.elements.passwordInput.value

    const result = await dispatch(signIn({ username, password, rememberMe }))

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
      className={classNames(className, classes.root)}
      onSubmit={handleSubmit}
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

      <RadioGroup
        aria-label="remember me"
        name="rememberMe"
        value={rememberMe}
        onChange={(event) => setRememberMe(event.target.value)}
        className={classes.radioGroup}
      >
        <FormControlLabel
          value="local"
          control={<Radio size="small" />}
          label={
            <Typography variant="body2">Remember me on this device</Typography>
          }
        />
        <FormControlLabel
          value="session"
          control={<Radio size="small" />}
          label={
            <Typography variant="body2">
              Remember me until I close the browser
            </Typography>
          }
        />
        <FormControlLabel
          value="none"
          control={<Radio size="small" />}
          label={
            <Typography variant="body2">Do not remember me at all</Typography>
          }
        />
      </RadioGroup>

      <ErrorAlert error={error} />

      <Button
        disabled={isPending}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Log In
      </Button>

      <Typography variant="body2" align="right">
        Not registered yet?&nbsp;
        <Link {...signUpNavItem} />
      </Typography>
    </Paper>
  )
}

export default SignInForm
