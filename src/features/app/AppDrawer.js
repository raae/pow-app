import React from "react"
import { Link } from "gatsby"
import { useSelector, useDispatch } from "react-redux"
import { Toolbar, Divider, Drawer, makeStyles } from "@material-ui/core"
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
  logo: {
    height: "3rem",
    marginTop: theme.spacing(0.5),
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
      onClose={handleCloseDrawer}
      {...props}
    >
      <Toolbar>
        <Link to={TIMELINE.to} onClick={handleCloseDrawer}>
          <img className={classes.logo} src="/logo.png" alt="logo" />
        </Link>
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
