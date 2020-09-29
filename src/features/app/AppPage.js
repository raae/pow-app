import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import { Container, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
  },
  offset: theme.mixins.toolbar,
}))

const AppPage = ({ children, className }) => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.offset} />
      <Container className={classnames(classes.root, className)}>
        {children}
      </Container>
    </>
  )
}

AppPage.propTypes = {
  children: PropTypes.node,
}

export default AppPage
