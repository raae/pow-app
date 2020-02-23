import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Container, Divider, makeStyles } from "@material-ui/core"

import BrandFooter from "../components/BrandFooter"
import { SignInButton, SignOutButton } from "./AuthButtons"

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: `4px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(2),
    background: theme.palette.background.paper,
    minHeight: "100vh",

    "& header": {
      display: "flex",
      alignItems: "center",
      marginTop: theme.spacing(10),
      "& > *:nth-child(2)": {
        marginLeft: "auto",
      },
    },

    "& footer": {
      "& hr": {
        display: "inline-block",
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
        width: theme.spacing(5),
        border: `2px solid ${theme.palette.primary.main}`,
      },
    },
  },
  container: {
    maxWidth: "50rem",
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
}))

const MainNav = ({ variant }) => {
  switch (variant) {
    case "home":
      return <SignInButton variant="outlined" size="small" color="secondary" />
    case "app":
      return <SignOutButton variant="outlined" size="small" color="secondary" />

    default:
      return null
  }
}

const BrandLayout = ({ variant, children }) => {
  const classes = useStyles()
  const logoPath = variant === "app" ? "/app" : "/"

  return (
    <div className={classes.root}>
      <Container className={classes.container} component="header">
        <GatsbyLink className={classes.logo} to={logoPath}>
          !
        </GatsbyLink>
        <MainNav variant={variant} />
      </Container>
      <Container className={classes.container} component="main">
        {children}
      </Container>
      <Container className={classes.container} component="footer">
        <Divider />
        <BrandFooter></BrandFooter>
      </Container>
    </div>
  )
}

export default BrandLayout
