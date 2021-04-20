import React, { useState } from "react"
import userbase from "userbase-js"
import { Button, TextField, FormHelperText } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"

import { SEO, Loading } from "../features/app"
import { useAuth } from "../features/auth"
import PageTemplate from "../templates/page"

const StuffPage = () => {
  const { authIsPending } = useAuth

  const [status, setStatus] = useState("INITIAL")
  const [error, setError] = useState(null)
  const disabled = status === "PENDING"
  const displayError = status === "ERROR" && error

  const handleTemporaryPassword = async (event) => {
    event.preventDefault()
    try {
      const username = event.target.elements.usernameInput.value
      setStatus("PENDING")
      await userbase.forgotPassword({
        username,
      })
      setStatus("EMAIL_SENT")
    } catch (error) {
      setStatus("ERROR")
      setError(error)
    }
  }

  if (authIsPending) {
    return <Loading />
  }

  return (
    <PageTemplate>
      <SEO title="Secret" />
      <h1>Support Stuff</h1>
      <Alert severity="warning">
        This page should only be used if directed here by POW! support.
      </Alert>
      <h2>Password Recovery</h2>
      <p>
        This might work if you are using the same device and browser you have
        logged in with before, and you choose "remember me" the last time you
        successfully logged in.
      </p>
      <form onSubmit={handleTemporaryPassword}>
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
        {displayError && <FormHelperText>{error.message}</FormHelperText>}
      </form>
    </PageTemplate>
  )
}

export default StuffPage
