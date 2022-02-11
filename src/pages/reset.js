import React, { useState } from "react"
import userbase from "userbase-js"
import { Button, TextField, FormGroup } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"

import { Seo } from "../features/app"
import { useAuth } from "../features/auth"
import PageTemplate from "../templates/page"

const STATUS = {
  PENDING: "Pending",
  IDLE: "Idle",
}

const StuffPage = () => {
  const { isAuthPending } = useAuth()

  const [status, setStatus] = useState(STATUS.IDLE)
  const disabled = status === STATUS.PENDING || isAuthPending

  const handleTemporaryPassword = async (event) => {
    event.preventDefault()
    try {
      const username = event.target.elements.usernameInput.value
      setStatus(STATUS.PENDING)
      await userbase.forgotPassword({
        username,
      })
      alert("Email sent. Check you inbox")
      setStatus(STATUS.IDLE)
    } catch (error) {
      alert(error.message)
      setStatus(STATUS.IDLE)
    }
  }

  return (
    <PageTemplate>
      <Seo title="Reset password" />

      <h1>Reset password</h1>

      <Alert severity="warning">
        This page should only be used if directed here by POW! Support.
      </Alert>

      <p>
        This might work if you are using the same device and browser you have
        logged in with before, and you choose remember me the last time you
        successfully logged in from that device and browser.
      </p>

      <form onSubmit={handleTemporaryPassword}>
        <FormGroup>
          <TextField
            id="usernameInput"
            type="text"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoComplete="username"
            disabled={disabled}
          />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            disabled={disabled}
          >
            Send temporary password
          </Button>
        </FormGroup>
      </form>
    </PageTemplate>
  )
}

export default StuffPage
