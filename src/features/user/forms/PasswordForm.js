import React from "react"
import PropTypes from "prop-types"
import { TextField } from "@material-ui/core"

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


import { useUser } from "../useUser"

export const PasswordForm = ({ Component, title, onDone }) => {
  const { updateUser, isUpdating, isLoading } = useUser()

  const handleSubmit = async (event) => {
    // 1. Go get that form and prevent it from naughtily self-submitting
    event.preventDefault()

    // 2. Listen for those PasSwords from those inputs
    const oldPassword = event.target.elements.currentPasswordInput.value
    const newPassword = event.target.elements.newPasswordInput.value
    const newSamePassword = event.target.elements.newSamePassword.value
    // Before calling updateUser make sure the password in both of the new password inputs are the same
    // 3. Do somethings like, send those PasSwords to Daniel's and  ...'s Userbase

    if (newPassword !== newSamePassword) {
      alert(
        `You typed your "New Password Again" incorrectly, please try again.`
      )
    } else {
      const { error } = await updateUser({
        currentPassword: oldPassword,
        newPassword: newPassword,
      })

      // 4. Send that customer back to /profile or give alert if error
      if (error) {
        alert(error.message)
      } else {
        alert(`Success, your new password is good to go.`)
        onDone()
      }
    }
  }

  const handleReset = (event) => {
    event.preventDefault()
    onDone()
  }

  const disabled = isUpdating || isLoading
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const handleChange = (event) => {}
  const handleClickShowPassword = (event) => {}
  const handleMouseDownPassword = (event) => {}
  return (
    <Component
      onSubmit={handleSubmit}
      onReset={handleReset}
      title={title}
      disabled={disabled}
    >
      <TextField
        disabled={disabled}
        id="currentPasswordInput"
        type="password"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Current Password"
        name="Current password"
        autoComplete="current-password"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle pasSword visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
            {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      <TextField
        disabled={disabled}
        id="newPasswordInput"
        type="password"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="New Password"
        name="New Password"
        autoComplete="new-password"
      />
      <TextField
        disabled={disabled}
        id="newSamePassword"
        type="password"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="New Password Again"
        name="New SamePassword"
        autoComplete="new-password"
      />
    </Component>
  )
}

PasswordForm.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf(["form"])])
    .isRequired,
  title: PropTypes.string,
  onDone: PropTypes.func,
}

PasswordForm.defaultProps = {
  Component: "form",
  onDone: () => {},
}
