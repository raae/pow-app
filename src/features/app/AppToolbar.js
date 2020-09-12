import React from "react"
import PropTypes from "prop-types"
import { Toolbar, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  toolbar: {
    position: "fixed",
    width: "100%",
    backgroundColor: theme.palette.background.default,
    zIndex: theme.zIndex.appBar,
    "& button:last-child": {
      marginLeft: "auto",
    },
  },
}))

const AppToolbar = ({ children }) => {
  const classes = useStyles()
  return (
    <>
      <Toolbar className={classes.toolbar}>{children}</Toolbar>
      <Toolbar />
    </>
  )
}

AppToolbar.propTypes = {
  children: PropTypes.node,
}

export default AppToolbar
