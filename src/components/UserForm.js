import React, { useState, useEffect, useRef } from "react"
// , useEffect, useRef
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
  onDone,
  standalone = true,
  onSubmitFulfilled,
  children,
  className,
}) => {
  const classes = useStyles()
  variant = variant.toLowerCase()
  const showEmail = variant === "signup" || variant === "update"

  const { isPending: isAuthPending, user } = useAuthState()
  const { signIn, signUp, updateUser } = useAuthActions()

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

  const inputRef = useRef()

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus()
    }
  }, [inputRef])
  // something else than  note: entryNote
  //const [values, setValues] = useState({ note: entryNote })

  // something else than  note: entryNote
  const handleReset = (event) => {
    event.preventDefault()
    //setValues({ note: entryNote })
    if (onDone) {
      onDone(event, "reset")
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsPending(true)

    let result = null
    if (variant === "signup") {
      result = await signUp(state, { redirect: !onSubmitFulfilled })
    } else if (variant === "update") {
      result = await updateUser(state, { redirect: !onSubmitFulfilled })
    } else {
      result = await signIn(state, { redirect: !onSubmitFulfilled })
    }

    if (result.error) {
      setError(result.error)
      setIsPending(false)
    } else if (onSubmitFulfilled) {
      onSubmitFulfilled()
    }

    if (onDone) {
      onDone(event, "submit")
    }
  }

  return (
    <>
      <form
        noValidate
        //className={className}
        onReset={handleReset}
        onSubmit={handleSubmit}
      >
        <TextField
          //variant="outlined"
          //variant={variant}
          margin="normal"
          required
          fullWidth
          inputRef={inputRef}
          id="username"
          label="Username (not email)"
          name="username"
          placeholder="unicorn"
          value={state.username}
          autoComplete="username"
          onChange={handleChange("username")}
          InputLabelProps={{ shrink: true }}
        />
        {showEmail && (
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            inputRef={inputRef}
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
          inputRef={inputRef}
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
        <Alert className={classes.alert} severity="info">
          <Typography component="div">
            There is no password recovery in apps securing your data with
            encryption. So please <strong>do</strong> write down this password
            somewhere safe. I recommend using a password manager and my favorite
            is <Link href="https://1password.com/">1Password</Link>.
          </Typography>
        </Alert>
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
              <MuiLink {...appNavItem}>go to app</MuiLink>.
            </div>
          </Alert>
        )}
        <Button
          className={classes.submit}
          disabled={isAuthPending || isPending || !!user}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          {variant === "signup" ? "Create account" : "Log In"}
        </Button>
        <Grid justify="space-between" container>
          <Grid item>
            <Typography variant="body2" align="left">
              Information for <MuiLink {...betaNavItem}>beta users</MuiLink>.
            </Typography>
          </Grid>
          <Grid item>
            {variant === "signup" ? (
              <Typography variant="body2" align="right">
                Already have an account?&nbsp;
                <MuiLink {...signInNavItem}>{signInNavItem.label}</MuiLink>
              </Typography>
            ) : (
              <Typography variant="body2" align="right">
                Don't have an account?&nbsp;
                <MuiLink {...signUpNavItem}>{signUpNavItem.label}</MuiLink>
              </Typography>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default UserForm
