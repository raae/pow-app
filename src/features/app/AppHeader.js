import React from "react"
import { Link as GatsbyLink } from "gatsby"
import {
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  Menu,
  Container,
  MenuItem,
  makeStyles,
} from "@material-ui/core"

import { Menu as MenuIcon } from "@material-ui/icons"

import {
  useSignOutNavItem,
  useAppNavItem,
  useProfileNavItem,
  useWebsiteNavItem,
  useSignInNavItem,
} from "../navigation"

import Logo from "./Logo"

const MainNav = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const isMenuOpen = Boolean(anchorEl)
  const signOutNavItem = useSignOutNavItem()
  const appNavItem = useAppNavItem()
  const profileNavItem = useProfileNavItem()
  const websiteNavItem = useWebsiteNavItem()

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const menuId = "primary-menu"

  return (
    <>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem {...appNavItem} onClick={handleMenuClose} />
        <MenuItem {...profileNavItem} onClick={handleMenuClose} />
        <Divider />
        <MenuItem {...signOutNavItem} onClick={handleMenuClose} />
        <Divider />
        <MenuItem {...websiteNavItem} onClick={handleMenuClose} />
      </Menu>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderTop: `4px solid ${theme.palette.primary.main}`,
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  toolbar: {
    fontSize: "2rem",
    alignItems: "center",
    maxWidth: "55rem",
    margin: "0 auto",
    "& > *:last-child": {
      marginLeft: "auto",
    },
    "& > nav > *": {
      marginRight: theme.spacing(1),
    },
    "& > div": {
      margin: theme.spacing(0, 4),
    },
  },
}))

const AppHeader = ({ toolbar }) => {
  const classes = useStyles()
  const signInItem = useSignInNavItem()
  return (
    <AppBar
      className={classes.appBar}
      elevation={0}
      position="sticky"
      color="inherit"
    >
      <Container>
        <Toolbar className={classes.toolbar}>
          <Logo component={GatsbyLink} to={signInItem.to}>
            !
          </Logo>
          {toolbar}
          <nav>
            <MainNav />
          </nav>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default AppHeader
