import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import { Container, Paper, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
  },
  offset: theme.mixins.toolbar,
  paper: {
    padding: theme.spacing(3),
  },
}))

const AppPage = ({ children, withPaper, className }) => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.offset} />
      <Container className={classnames(classes.root, className)}>
        {withPaper ? (
          <Paper className={classes.paper}>{children}</Paper>
        ) : (
          children
        )}
      </Container>
    </>
  )
}

AppPage.propTypes = {
  children: PropTypes.node,
}

export default AppPage
