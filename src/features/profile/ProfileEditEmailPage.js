import React from "react"
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

  const currentEmail = useSelector(selectUserEmail)

  const createEmail = (event) => {
    // 1. Prevent that form from naughtily self-submitting

    event.preventDefault()

    // 2. Get that email from the input

    const email = event.target.elements.emailInput.value

    // 3. Send that email to Daniel V.'s Userbase

    dispatch(updateUser({ email: email }))

    // 4. Send that customer back to /profile

    navigate(`/profile`)
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
            id="emailInput"
            type="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="New email"
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

        <AppEditToolbar>
          <Typography variant="h6" className={classes.title}>
            Edit email
          </Typography>
        </AppEditToolbar>
      </form>
    </AppLayout>
  )
}

export default ProfileEditEmailPage
