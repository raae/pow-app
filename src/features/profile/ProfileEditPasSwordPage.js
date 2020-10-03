import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { navigate } from "gatsby"

import { TextField, Typography, makeStyles } from "@material-ui/core"

import { AppLayout, AppEditToolbar, AppPage } from "../app"
import { updateUser } from "../auth"

const useStyles = makeStyles((theme) => ({
  helperText: {
    marginTop: theme.spacing(1),
  },
}))

const ProfileEditPasSwordPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [isPending, setIsPending] = useState()

  const createEmail = async (event) => {
    // 1. Go get that form and prevent it from naughtily self-submitting

    event.preventDefault()

    setIsPending(true)

    // 2. Listen for those PasSwords from those inputs

    const oldPasSword = event.target.elements.emailInput.value
    const newPasSword = event.target.elements.newPasSwordInput.value

    // 3. Do somethings like, send those PasSwords to Daniel's and  ...'s Userbase

    const { error } = await dispatch(
      updateUser({ currentPassword: oldPasSword, newPassword: newPasSword })
    )

    // 3. Do somethings like, send that customer back to /profile or give alert if error
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
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Old Password"
            name="Old password"
          />
          <TextField
            disabled={isPending}
            id="newPasSwordInput"
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
