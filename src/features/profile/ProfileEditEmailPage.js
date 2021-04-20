import React, { useState } from "react"
import { navigate } from "gatsby"

import { TextField, Typography, makeStyles } from "@material-ui/core"

import { AppLayout, AppEditToolbar, AppPage } from "../app"
import { useUser } from "../user"

const useStyles = makeStyles((theme) => ({
  helperText: {
    marginTop: theme.spacing(1),
  },
}))

const ProfileEditEmailPage = () => {
  const classes = useStyles()
  const [isPending, setIsPending] = useState()

  const { user, updateUser } = useUser()

  const handleSubmit = async (event) => {
    // 1. Go get that form and prevent it from naughtily self-submitting

    event.preventDefault()

    // Question what does it mean? "setIsPending(true)"?
    setIsPending(true)

    // 2. Get that email from the input

    const newEmail = event.target.elements.emailInput.value

    // 3. Send that email to Daniel V.'s Userbase

    const { error } = await updateUser({ email: newEmail })

    // 4. Send that customer back to /profile or give alert if error
    if (error) {
      setIsPending(false)
      alert(error.message)
    } else {
      navigate(`/profile`)
    }
  }

  const handleReset = (event) => {
    event.preventDefault()
    navigate(`/profile`)
  }

  return (
    <AppLayout>
      <form
        className={classes.form}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <AppPage withPaper>
          <TextField
            disabled={isPending}
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
        </AppPage>

        <AppEditToolbar disabled={isPending}>
          <Typography variant="h6" className={classes.title}>
            Edit email
          </Typography>
        </AppEditToolbar>
      </form>
    </AppLayout>
  )
}

export default ProfileEditEmailPage
