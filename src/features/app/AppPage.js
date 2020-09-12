import React from "react"
import PropTypes from "prop-types"
import { Container, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 0,
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      maxWidth: 600,
    },
  },
}))

const AppPage = ({ children }) => {
  const classes = useStyles()
  return <Container className={classes.root}>{children}</Container>
}

AppPage.propTypes = {
  children: PropTypes.node,
}

export default AppPage
