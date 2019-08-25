import React from "react"

import {
  CssBaseline,
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  Chip,
  IconButton,
} from "@material-ui/core"
import LogoIcon from "@material-ui/icons/Face"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  nav: {
    marginLeft: "auto",
    "& > *": {
      marginLeft: theme.spacing(1),
    },
  },
  footer: {
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

const Home = (itemProps) => (
  <Chip {...itemProps} clickable color="primary" icon={<LogoIcon />}></Chip>
)

const Layout = ({ homeItem, navItems, footer, children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline></CssBaseline>
      <AppBar color="inherit" position="sticky">
        <Toolbar>
          <Home className={classes.home} {...homeItem}></Home>
          <Nav items={navItems} className={classes.nav}></Nav>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>{children}</main>
      <footer className={classes.footer}>{footer}</footer>
    </div>
  )
}

export default Layout
