import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { navigate } from "gatsby"

import { TextField, Typography, makeStyles } from "@material-ui/core"

import { AppLayout, AppEditToolbar, AppPage } from "../app"
import { updateUser, selectUserEmail } from "../auth"

const useStyles = makeStyles((theme) => ({
  helperText: {
    marginTop: theme.spacing(1),
  },
}))

const ProfileEditEmailPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [isPending, setIsPending] = useState()

  const currentEmail = useSelector(selectUserEmail)

  const createEmail = async (event) => {
    // 1. Go get that form and prevent it from naughtily self-submitting

    event.preventDefault()

    // Question what does it mean? "setIsPending(true)"?
    setIsPending(true)

    // 2. Get that email from the input

    const email = event.target.elements.emailInput.value

    // 3. Send that email to Daniel V.'s Userbase

    const { error } = await dispatch(updateUser({ email: email }))

    // 4. Send that customer back to /profile or give alert if error
    if (error) {
      setIsPending(false)
      alert(error.message)
    } else {
      navigate(`/profile`)
    }
  }

  const createReset = (event) => {
    event.preventDefault()
    navigate(`/profile`)
  }

  return (
    <AppLayout>
      <form
        className={classes.form}
        onSubmit={createEmail}
        onReset={createReset}
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
                Your current POW! email is <strong>{currentEmail}</strong>.
              </>
            }
          />
        </AppPage>

        <AppEditToolbar disabled={isPending}>
          <Typography variant="h6" className={classes.title}>
            Change email
          </Typography>
        </AppEditToolbar>
      </form>
    </AppLayout>
  )
}

export default ProfileEditEmailPage
