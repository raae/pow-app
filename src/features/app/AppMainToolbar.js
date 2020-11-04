import React from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { AppBar, Toolbar, Hidden, IconButton } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"

import { actions, selectIsDrawerOpen } from "./slice"
const { openDrawer, closeDrawer } = actions

const AppMainToolbar = ({ children }) => {
  const dispatch = useDispatch()
  const isOpen = useSelector(selectIsDrawerOpen)

  return (
    <AppBar>
      <Toolbar>
        <Hidden mdUp>
          <IconButton
            variant="raised"
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => dispatch(isOpen ? closeDrawer() : openDrawer())}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        {children}
      </Toolbar>
    </AppBar>
  )
}

AppMainToolbar.propTypes = {
  children: PropTypes.node,
}

export default AppMainToolbar
