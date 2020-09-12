import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Hidden, IconButton } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"

import { actions, selectIsDrawerOpen } from "./slice"
const { openDrawer, closeDrawer } = actions

const AppDrawerButton = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(selectIsDrawerOpen)
  return (
    <Hidden mdUp>
      <IconButton
        variant="raised"
        color="inherit"
        aria-label="open drawer"
        edge="end"
        onClick={() => dispatch(isOpen ? closeDrawer() : openDrawer())}
      >
        <MenuIcon />
      </IconButton>
    </Hidden>
  )
}

AppDrawerButton.propTypes = {}

export default AppDrawerButton
