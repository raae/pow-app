import React from "react"

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
import { Skeleton } from "@material-ui/lab"

const useStyles = makeStyles((theme) => ({}))

const ProfileCard = ({ menuItems }) => {
  const classes = useStyles()
  const { user } = useUser()

  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null)

  const handleOpenMenu = (event) => {
    setMenuAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setMenuAnchorEl(null)
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <AccountCircle />
          </Avatar>
        }
        action={
          menuItems?.length && (
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
                {menuItems.map((item) => {
                  return <MenuItem key={item.to} {...item} />
                })}
              </Menu>
            </>
          )
        }
        title={user?.username || <Skeleton width={40} />}
        subheader={user?.email || <Skeleton width={50} />}
      />
      <CardContent>
        <Typography variant="body2" gutterBottom>
          POW! is a very young app. To stay updated on its life and advances
          sign up for the newsletter. You may cancel at any time.
        </Typography>
        <NewsletterSwitch disabled={!user?.email} />
      </CardContent>
    </Card>
  )
}

export default ProfileCard
