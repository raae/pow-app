import React from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import {
  AppBar,
  Toolbar,
  Hidden,
  IconButton,
  makeStyles,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"

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
    <AppBar>
      <Toolbar>
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
      </Toolbar>
    </AppBar>
  )
}

AppMainToolbar.propTypes = {
  children: PropTypes.node,
}

export default AppMainToolbar
