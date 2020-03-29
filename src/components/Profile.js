import React from "react"
import { Link as GatsbyLink } from "gatsby"
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Typography,
  FormControlLabel,
  Switch,
  Fab,
  makeStyles,
} from "@material-ui/core"
import AccountCircle from "@material-ui/icons/AccountCircle"
import EditNoteIcon from "@material-ui/icons/Edit"

import { useAuthState, useAuthActions } from "../auth"

const useStyles = makeStyles((theme) => ({
  // root: {
  //   position: "relative",
  //   overflow: "initial",
  //   marginRight: theme.spacing(1),
  // },
  // title: {
  //   fontSize: 14,
  // },
  // noWrap: {
  //   whiteSpace: "nowrap",
  // },
  // note: {
  //   display: "block",
  //   whiteSpace: "pre-line",
  //   margin: theme.spacing(3, 0, 3),
  //   padding: theme.spacing(2),
  //   background: theme.palette.background.default,
  //   "&:last-child": {
  //     marginBottom: theme.spacing(1),
  //   },
  //   "& .MuiInputBase-root": {
  //     background: theme.palette.background.paper,
  //   },
  // },
  // tags: {
  //   margin: theme.spacing(2, 0, 0),
  // },
  submit: {
    position: "absolute",
    right: 0,
    bottom: 0,
    transform: "translate(30%, 30%)",
  },
  // reset: {
  //   position: "absolute",
  //   right: 60,
  //   bottom: 0,
  //   transform: "translate(30%, 30%)",
  // },
  // prediction: {
  //   padding: theme.spacing(2),
  // },
}))

const Profile = () => {
  const classes = useStyles()
  const { user } = useAuthState()
  const { updateUser } = useAuthActions()
  const userProfile = user.profile || {}
  const userProfileProtected = user.protectedProfile || {}
  const userEmail = user.email || userProfileProtected.stripeEmail

  const handleChange = (name) => (event) => {
    const profile = {
      [name]: event.target.checked ? "1" : "0",
    }
    updateUser({ email: userEmail, profile: { ...userProfile, ...profile } })
  }

  if (!user) return null

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <AccountCircle />
          </Avatar>
        }
        title={<strong>{user.username}</strong>}
        subheader={userEmail}
      />

      <CardContent>
        {userEmail && (
          <Typography variant="body2" color="textSecondary" gutterBottom>
            POW! is a very young app. To stay updated on its life and advances
            sign up for the newsletter. You may cancel at any time.
          </Typography>
        )}
        {userEmail && (
          <FormControlLabel
            control={
              <Switch
                checked={userProfile.newsletter === "1" ? true : false}
                onChange={handleChange("newsletter")}
                value="newsletter"
              />
            }
            label="I would like to receive the POW! Newsletter"
          />
        )}
        <Fab
          color="secondary"
          size="large"
          aria-label="Edit note"
          component={GatsbyLink}
          to={`/profile/edit`}
          // className={classes.submit}
        >
          <EditNoteIcon />
        </Fab>
      </CardContent>
    </Card>
  )
}

export default Profile
