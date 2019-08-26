import React from "react"

import {
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  IconButton,
} from "@material-ui/core"
import BrandFooter from "./BrandFooter"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  appBar: {
    background: "transparent",
  },
  main: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  nav: {
    "&:last-child": {
      marginLeft: "auto",
    },
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
    marginTop: "auto",
    backgroundColor: theme.palette.background.paper,
    textAlign: "center",
  },
  home: {
    fontWeight: theme.typography.fontWeightBold,
    transform: "scale(1.2)",
  },
}))

const Nav = ({ items = [], ...props }) => (
  <nav {...props}>
    {items.map(({ label, icon, ...itemProps }, key) =>
      !icon ? (
        <Button key={key} {...itemProps}>
          {label}
        </Button>
      ) : (
        <IconButton {...itemProps}>{icon}</IconButton>
      )
    )}
  </nav>
)

const BrandLayout = ({ homeItem, navItems, footer, children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar elevation={0} color="inherit" position="sticky">
        <Toolbar>
          {homeItem}
          <Nav items={navItems} className={classes.nav}></Nav>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>{children}</main>
      <footer className={classes.footer}>
        <BrandFooter></BrandFooter>
      </footer>
    </div>
  )
}

export default BrandLayout
