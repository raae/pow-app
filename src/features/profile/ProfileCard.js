import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { useSelector, useDispatch } from "react-redux"

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

import {
  selectUsername,
  selectProfile,
  selectIsAuthenticated,
  selectUserEmail,
  updateUser,
} from "../auth"

const useStyles = makeStyles((theme) => ({}))

const ProfileCard = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const username = useSelector(selectUsername) || ""
  const userEmail = useSelector(selectUserEmail) || ""
  const userProfile = useSelector(selectProfile) || {}

  const handleChange = (name) => (event) => {
    // Handle newsletter subscription change

    const profile = {
      [name]: event.target.checked ? "1" : "0",
    }

    dispatch(
      updateUser({
        email: userEmail,
        profile: { ...userProfile, ...profile },
      })
    )
  }

  // Open / close menu

  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null)

  const handleOpenMenu = (event) => {
    setMenuAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setMenuAnchorEl(null)
  }

  if (!isAuthenticated) return null

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
                Edit email
              </MenuItem>
              <MenuItem component={GatsbyLink} to={`/profile/password`}>
                Edit password
              </MenuItem>
            </Menu>
          </>
        }
        title={username}
        subheader={userEmail}
      />
      {userEmail && (
        <CardContent>
          <Typography variant="body2" gutterBottom>
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
