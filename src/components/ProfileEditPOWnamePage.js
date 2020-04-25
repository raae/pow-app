import React from "react"
import { useAuthActions } from "../auth"
import { navigate } from "gatsby"
import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
  TextField,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"

const ProfileEditPOWnamePage = () => {
  const classes = useStyles()
  const { updateUser } = useAuthActions()

  const createNewPOWname = (event) => {
    event.preventDefault()
    const myNewPOWname = event.target.elements.POWnameInput.value
    updateUser({ username: myNewPOWname })
    navigate(`/profile`)
  }

  const createReset = (event) => {
    event.preventDefault()
    navigate(`/profile`)
  }
  return (
    <div className={}>
      <Toolbar />
      <Paper
        component="form"
        onSubmit={createNewPOWname}
        onReset={createReset}
        className={}
      >
        <label htmlFor="POWnameInput">
          You Pick A Year{" "}
          <TextField
            id="POWnameInput"
            type="text"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="New POW name"
            name="POW name"
            placeholder="1554@london.uk"
            autoComplete="username"
            helperText={
              <>
                Your current POW name is <strong>Unicorny</strong>.
              </>
            }
          />
        </label>
        <AppBar
          position="absolute"
          component="div"
          color="white"
          elevation={0}
          className={}
        >
          <Toolbar className={}>
            <IconButton
              type="reset"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" className={}>
              Change Your POW Name
            </Typography>

            <Button type="submit" variant="outlined" color="primary">
              Update
            </Button>
          </Toolbar>
        </AppBar>
      </Paper>
    </div>
  )
}
export default ProfileEditPOWnamePage
