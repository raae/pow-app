import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Toolbar, Button, Divider, Drawer, makeStyles } from "@material-ui/core"
import {
  NavMenu,
  TIMELINE,
  PROFILE,
  SIGNOUT,
  SUPPORT,
  TWITTER,
  WEBSITE,
} from "../navigation"

import { selectIsDrawerOpen, actions } from "./slice"
const { closeDrawer } = actions

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
  },
  footer: {
    textAlign: "center",
    padding: theme.spacing(2),
  },
  pushDown: {
    marginTop: "auto",
  },
}))

const AppDrawer = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isDrawerOpen = useSelector(selectIsDrawerOpen)

  const handleCloseDrawer = () => dispatch(closeDrawer(false))

  return (
    <Drawer
      className={classes.root}
      open={isDrawerOpen}
      onClose={closeDrawer}
      {...props}
    >
      <Toolbar>
        <Button {...TIMELINE} onClick={handleCloseDrawer}>
          POW!
        </Button>
      </Toolbar>
      <Divider />
      <NavMenu items={[TIMELINE, PROFILE]} onClick={handleCloseDrawer} />
      <Divider />
      <NavMenu items={[SIGNOUT]} onClick={handleCloseDrawer} />

      <Divider className={classes.pushDown} />
      <footer>
        <NavMenu items={[SUPPORT, TWITTER, WEBSITE]} />
      </footer>
    </Drawer>
  )
}

AppDrawer.propTypes = {}

export default AppDrawer
