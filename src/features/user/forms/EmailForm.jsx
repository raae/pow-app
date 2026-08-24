import React from "react"
import PropTypes from "prop-types"
import { TextField, makeStyles } from "@material-ui/core"

import { useUser } from "../useUser"

const useStyles = makeStyles((theme) => ({
  helperText: {
    marginTop: theme.spacing(1),
  },
}))

export const EmailForm = ({ Component, title, onDone }) => {
  const classes = useStyles()

  const { user, isUpdating, isLoading, updateUser } = useUser()

  const handleSubmit = async (event) => {
    // 1. Go get that form and prevent it from naughtily self-submitting
    event.preventDefault()

    // 2. Get that email from the input
    const newEmail = event.target.elements.emailInput.value

    // 3. Send that email to Daniel V.'s Userbase
    const { error } = await updateUser({ email: newEmail })

    // 4. Send that customer back to /profile or give alert if error
    if (error) {
      alert(error.message)
    } else {
      onDone()
    }
  }

  const handleReset = (event) => {
    event.preventDefault()
    onDone()
  }

  const disabled = isUpdating || isLoading

  return (
    <Component
      onSubmit={handleSubmit}
      onReset={handleReset}
      disabled={disabled}
      title={title}
    >
      <TextField
        disabled={disabled}
        id="emailInput"
        type="email"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="New Email"
        name="email"
        // placeholder="unicorn@usepow.app"
        autoComplete="email"
        FormHelperTextProps={{ className: classes.helperText }}
        helperText={
          <>
            Your current POW! email is <strong>{user?.email}</strong>.
          </>
        }
      />
    </Component>
  )
}

EmailForm.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf(["form"])])
    .isRequired,
  title: PropTypes.string,
  onDone: PropTypes.func,
}

EmailForm.defaultProps = {
  Component: "form",
  onDone: () => {},
}
