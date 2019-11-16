import React from "react"
import { Container, Divider, makeStyles } from "@material-ui/core"

import BrandFooter from "../components/BrandFooter"
import { Link } from "../components/Link"
import SignInButton from "./SignInButton"

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
    fontFamily: "Seymour One",
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

const BrandLayout = ({ isHome = true, children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Container className={classes.container} component="header">
        <Link className={classes.logo} href="/">
          !
        </Link>
        {isHome && (
          <SignInButton variant="outlined" size="small" color="secondary">
            Log in
          </SignInButton>
        )}
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
