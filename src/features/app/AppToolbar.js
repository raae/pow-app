import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import { Toolbar, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  toolbar: {
    width: "100%",
    position: "absolute",
    top: 0,
    backgroundColor: theme.palette.background.default,
    zIndex: theme.zIndex.appBar,
  },
}))

const AppToolbar = ({ children, className }) => {
  const classes = useStyles()
  return (
    <>
      <Toolbar className={classnames(classes.toolbar, className)}>
        {children}
      </Toolbar>
      <Toolbar />
    </>
  )
}

AppToolbar.propTypes = {
  children: PropTypes.node,
}

export default AppToolbar
