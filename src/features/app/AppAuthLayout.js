import React from "react"
import PropTypes from "prop-types"
import { Container, Box, Typography, makeStyles } from "@material-ui/core"
import { SUPPORT } from "../navigation"

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: "4px solid",
    borderColor: theme.palette.primary.main,
  },
  support: {
    textDecoration: "none",
    opacity: 0.6,

    "&:hover": {
      opacity: 1,
    },
  },
}))

const AppAuthLayout = ({ children, title, maxWidth = "xs" }) => {
  const classes = useStyles()
  return (
    <Box
      className={classes.root}
      display="flex"
      minHeight="100vh"
      flexDirection="column"
      justifyContent="center"
    >
      <Box minHeight="10vmin" />
      <Box
        component="header"
        alignContent="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={3}
        mt={10}
      >
        <Box
          component="img"
          className={classes.logo}
          src="/logo.png"
          alt="logo"
          height="3.5rem"
        />

        <Typography variant="h3" component="h1">
          {title}
        </Typography>
      </Box>

      <Container maxWidth={maxWidth} component="main">
        {children}
      </Container>

      <Box mt={2} textAlign="center">
        <Typography
          color="textSecondary"
          variant="body2"
          {...SUPPORT}
          className={classes.support}
        >
          support@usepow.app
        </Typography>
      </Box>
      <Box minHeight="10vmin" />
    </Box>
  )
}

AppAuthLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
}

export default AppAuthLayout
