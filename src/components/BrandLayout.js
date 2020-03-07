import React from "react"
import classNames from "classnames"
import { Link as GatsbyLink } from "gatsby"
import {
  Container,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"

import {
  useSignOutNavItem,
  useAppNavItem,
  useWebsiteNavItem,
  useProfileNavItem,
} from "./navItems"

import BrandFooter from "./BrandFooter"
import Logo from "./Logo"
import { SignInButton, SignUpButton } from "./AuthButtons"

const useStyles = makeStyles((theme) => ({
  root: {
    "& header": {
      maxWidth: "55rem",
      margin: "0 auto",
    },
    "& main": {
      maxWidth: "50rem",
    },
    "& footer": {
      maxWidth: "50rem",
    },
  },
  app: {
    "& main": {
      marginTop: "2rem",
      padding: theme.spacing(0, 3),
    },
  },
  appBar: {
    borderTop: `4px solid ${theme.palette.primary.main}`,
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  offset: theme.mixins.toolbar,
  toolbar: {
    alignItems: "center",
    "& > *:last-child": {
      marginLeft: "auto",
    },
    "& > nav > *": {
      marginRight: theme.spacing(1),
    },
    "& > div": {
      margin: theme.spacing(0, 4),
    },
    fontSize: "2rem",
    width: "100%",
  },
  content: {
    maxWidth: "40rem",
    "&$app": {
      maxWidth: "32rem",
    },
  },
  logo: {
    display: "inline-block",
    fontFamily: `'Seymour One', ${theme.typography.h1.fontFamily}`,
    fontWeight: 900,
    fontSize: theme.typography.h2.fontSize,
    textDecoration: "none !important",
    "&:hover": {
      textDecoration: "none",
      transform: "scale(1.2)",
      color: theme.palette.primary.main,
    },
  },
  footer: {
    "& hr": {
      display: "inline-block",
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(2),
      width: theme.spacing(5),
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
}))

const MainNav = ({ variant }) => {
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

  const menuId = "primary-search-account-menu"

  switch (variant) {
    case "home":
      return (
        <>
          <SignUpButton variant="outlined" size="small" color="secondary" />
          <SignInButton variant="contained" size="small" color="primary" />
        </>
      )
    case "app":
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
            <MenuItem {...appNavItem} onClick={handleMenuClose}>
              {appNavItem.label}
            </MenuItem>
            <MenuItem {...profileNavItem} onClick={handleMenuClose}>
              {profileNavItem.label}
            </MenuItem>
            <Divider />
            <MenuItem {...signOutNavItem} onClick={handleMenuClose}>
              {signOutNavItem.label}
            </MenuItem>
            <Divider />
            <MenuItem {...websiteNavItem} onClick={handleMenuClose}>
              {websiteNavItem.label}
            </MenuItem>
          </Menu>
        </>
      )

    default:
      return null
  }
}

const BrandLayout = ({ variant, toolbar, children }) => {
  const classes = useStyles()
  const logoPath = variant === "app" ? "/cycle" : "/"

  return (
    <div className={classNames(classes.root, classes[variant])}>
      <AppBar
        component="div"
        className={classes.appBar}
        elevation={0}
        position="sticky"
        color="inherit"
      >
        <Toolbar component="header" className={classes.toolbar}>
          <Logo component={GatsbyLink} to={logoPath}>
            !
          </Logo>
          {toolbar}
          <nav>
            <MainNav variant={variant} />
          </nav>
        </Toolbar>
      </AppBar>
      <Container component="main">
        <div
          className={classNames(classes.content, {
            [classes.app]: variant === "app",
          })}
        >
          {children}
        </div>
      </Container>

      <Container component="footer" className={classes.footer}>
        <Divider />
        <BrandFooter variant={variant} />
      </Container>
    </div>
  )
}

export default BrandLayout
