import React from "react"
import PropTypes from "prop-types"
import { Hidden, makeStyles } from "@material-ui/core"

import AppDrawer from "./AppDrawer"

export const permanentDrawerWidth = "35%"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
    "& main": {
      position: "relative",
      flexGrow: 1,
      [theme.breakpoints.up("md")]: {
        maxWidth: 600,
      },

      "& .MuiAppBar-root": {
        [theme.breakpoints.up("md")]: {
          left: permanentDrawerWidth,
          maxWidth: 600,
        },
      },
    },
    "& > nav": {
      flexShrink: 0,
      position: "relative",
      [theme.breakpoints.up("md")]: {
        minWidth: permanentDrawerWidth,
      },
    },
  },
  temporary: {
    width: "90%",
    maxWidth: "240px",
  },
  permanent: {
    width: permanentDrawerWidth,
    paddingLeft: "10%",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: "15%",
    },
  },
}))

function AppLayout({ children }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <main>{children}</main>

      <nav>
        <Hidden mdUp>
          <AppDrawer
            variant="temporary"
            anchor="left"
            classes={{
              paper: classes.temporary,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          />
        </Hidden>
        <Hidden smDown>
          <AppDrawer
            variant="permanent"
            classes={{
              paper: classes.permanent,
            }}
            open
          />
        </Hidden>
      </nav>
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node,
}

export default AppLayout
