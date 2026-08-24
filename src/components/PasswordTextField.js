import React, { useState } from "react"
import { TextField, InputAdornment, IconButton } from "@material-ui/core"
import { Visibility, VisibilityOff } from "@material-ui/icons"

export const PasswordTextField = ({ InputProps, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleToggle = () => {
    setShowPassword((show) => !show)
  }

  // Keep focus in the input while toggling
  const handleMouseDown = (event) => {
    event.preventDefault()
  }

  return (
    <TextField
      {...props}
      type={showPassword ? "text" : "password"}
      InputProps={{
        ...InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={handleToggle}
              onMouseDown={handleMouseDown}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}
