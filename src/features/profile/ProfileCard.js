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
  makeStyles,
} from "@material-ui/core"
import AccountCircle from "@material-ui/icons/AccountCircle"
import MoreVertIcon from "@material-ui/icons/MoreVert"

import { useUser } from "../user"

import NewsletterSwitch from "./NewsletterSwitch"

const useStyles = makeStyles((theme) => ({}))

const ProfileCard = () => {
  const classes = useStyles()

  // Open / close menu

  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null)

  const handleOpenMenu = (event) => {
    setMenuAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setMenuAnchorEl(null)
  }

  // User functionality

  const { user } = useUser()

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
        title={user?.username}
        subheader={user?.email}
      />
      {user?.email && (
        <CardContent>
          <Typography variant="body2" gutterBottom>
            POW! is a very young app. To stay updated on its life and advances
            sign up for the newsletter. You may cancel at any time.
          </Typography>
          <NewsletterSwitch />
        </CardContent>
      )}
    </Card>
  )
}

export default ProfileCard
