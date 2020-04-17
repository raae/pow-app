import React, { useState } from "react"
import { useAuthActions } from "../auth"
import { navigate } from "gatsby"
import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  TextField,
} from "@material-ui/core"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"

const ProfileEditPage3 = () => {
  const { updateUser } = useAuthActions()
  function createEmail(event) {
    // 1. Prevent that form from naughtily self-submitting

    event.preventDefault()

    // 2. Get that email from the input

    const email = event.target.elements.emailInput.value
    console.log(event.target.elements.emailInput.value)

    // 3. Send that email to Daniel V.'s Userbase

    updateUser({ email: email })

    // 4. Send that customer back to /profile

    navigate(`/profile`)
  }
  return (
    <div>
      <div>
        <form onSubmit={createEmail}>
          <div>
            <label htmlFor="emailInput"></label>
            <TextField
              id="emailInput"
              type="text"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              // inputRef={inputRef}
              //id="email"
              label="Email"
              name="email"
              placeholder="unicorn@usepow.app"
              // value={state.email}
              autoComplete="email"
              // onChange={handleChange("email")}
              //  InputLabelProps={{ shrink: true }}
            />
          </div>

          <Toolbar>
            <IconButton
              type="reset"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <ArrowBackIcon />
            </IconButton>

            <Button
              type="submit"
              edge="end"
              variant="contained"
              color="primary"
            >
              Update
            </Button>
          </Toolbar>
        </form>
      </div>
    </div>
  )
}

export default ProfileEditPage3
