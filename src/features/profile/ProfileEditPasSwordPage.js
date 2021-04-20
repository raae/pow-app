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

const ProfileEditPasSwordPage = () => {
  const classes = useStyles()
  const { updateUser } = useUser()
  const [isPending, setIsPending] = useState()

  const handleSubmit = async (event) => {
    // 1. Go get that form and prevent it from naughtily self-submitting

    event.preventDefault()

    setIsPending(true)

    // 2. Listen for those PasSwords from those inputs

    const oldPassword = event.target.elements.currentPasswordInput.value
    const newPassword = event.target.elements.newPasswordInput.value

    // 3. Do somethings like, send those PasSwords to Daniel's and  ...'s Userbase

    const { error } = await updateUser({
      currentPassword: oldPassword,
      newPassword: newPassword,
    })

    // 3. Do somethings like, send that customer back to /profile or give alert if error
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
            id="currentPasswordInput"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Current Password"
            name="Current password"
          />
          <TextField
            disabled={isPending}
            id="newPasswordInput"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="New Password"
            name="New Password"
          />
        </AppPage>

        <AppEditToolbar disabled={isPending}>
          <Typography variant="h6" className={classes.title}>
            Edit password
          </Typography>
        </AppEditToolbar>
      </form>
    </AppLayout>
  )
}

export default ProfileEditPasSwordPage
