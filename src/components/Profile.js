import React from "react"
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Typography,
  FormControlLabel,
  Switch,
  makeStyles,
} from "@material-ui/core"
import AccountCircle from "@material-ui/icons/AccountCircle"

import { useAuthState, useAuthActions } from "../auth"

const useStyles = makeStyles((theme) => ({}))

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
          <Avatar aria-label="recipe" className={classes.avatar}>
            <AccountCircle />
          </Avatar>
        }
        title={<strong>{user.username}</strong>}
        subheader={userEmail}
      />
      {userEmail && (
        <CardContent>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            POW! is a very young app. To stay updated on its life and advances
            sign up for the newsletter. You may cancel at any time.
          </Typography>
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
        </CardContent>
      )}
    </Card>
  )
}

export default Profile
