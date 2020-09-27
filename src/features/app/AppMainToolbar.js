import React from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { Hidden, IconButton, makeStyles } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"

import AppToolbar from "./AppToolbar"

import { actions, selectIsDrawerOpen } from "./slice"
const { openDrawer, closeDrawer } = actions

const useStyles = makeStyles(() => ({
  drawerButton: {
    marginLeft: "auto",
  },
}))

const AppMainToolbar = ({ children }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isOpen = useSelector(selectIsDrawerOpen)

  return (
    <AppToolbar>
      {children}
      <Hidden mdUp>
        <IconButton
          className={classes.drawerButton}
          variant="raised"
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={() => dispatch(isOpen ? closeDrawer() : openDrawer())}
        >
          <MenuIcon />
        </IconButton>
      </Hidden>
    </AppToolbar>
  )
}

AppMainToolbar.propTypes = {
  children: PropTypes.node,
}

export default AppMainToolbar
