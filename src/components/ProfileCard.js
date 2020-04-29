import React from "react"
import { Link as GatsbyLink } from "gatsby"
import {
  Avatar,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Menu,
  MenuItem,
  FormControlLabel,
  Switch,
  makeStyles,
} from "@material-ui/core"
import AccountCircle from "@material-ui/icons/AccountCircle"
import MoreVertIcon from "@material-ui/icons/MoreVert"

import { useAuthState, useAuthActions } from "../auth"

const useStyles = makeStyles((theme) => ({}))

const ProfileCard = () => {
  const classes = useStyles()
  const { user } = useAuthState()

  // Handle newsletter subscription change

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

  // Open / close menu

  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null)

  const handleOpenMenu = (event) => {
    setMenuAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setMenuAnchorEl(null)
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
        action={
          <>
            <IconButton
              aria-label="settings"
              aria-controls="simple-menu"
              onClick={handleOpenMenu}
            >
              <MoreVertIcon />
            </IconButton>

            <Menu
              id="simple-menu"
              anchorEl={menuAnchorEl}
              keepMounted
              open={Boolean(menuAnchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={GatsbyLink} to={`/profile/edit`}>
                Edit email address
              </MenuItem>
              <MenuItem component={GatsbyLink} to={`/profile/newpowname`}>
                Change username
              </MenuItem>
            </Menu>
          </>
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

export default ProfileCard
