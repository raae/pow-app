import React from "react"
import classNames from "classnames"
import { Link as GatsbyLink } from "gatsby"
import {
  Container,
  Divider,
  AppBar,
  Toolbar,
  Button,
  makeStyles,
} from "@material-ui/core"

import BrandFooter from "./BrandFooter"
import Logo from "./Logo"
import { SignInButton, SignOutButton } from "./AuthButtons"

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
    "& > *:nth-child(2)": {
      marginLeft: "auto",
    },
    "& > *": {
      marginRight: "0.5em",
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
  switch (variant) {
    case "home":
      return (
        <>
          <Button
            variant="outlined"
            size="small"
            component={GatsbyLink}
            to="signup"
            color="secondary"
          >
            Sign Up
          </Button>
          <SignInButton
            variant="contained"
            size="small"
            color="primary"
            disableElevation
          />
        </>
      )
    case "app":
      return <SignOutButton variant="outlined" size="small" color="secondary" />

    default:
      return null
  }
}

const BrandLayout = ({ variant, children }) => {
  const classes = useStyles()
  const logoPath = variant === "app" ? "/day" : "/"

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
          <MainNav variant={variant} />
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
      {variant !== "app" && (
        <Container component="footer" className={classes.footer}>
          <Divider />
          <BrandFooter></BrandFooter>
        </Container>
      )}
    </div>
  )
}

export default BrandLayout
