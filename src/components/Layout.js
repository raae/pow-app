import React from "react"

import {
  CssBaseline,
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  Chip,
} from "@material-ui/core"
import LogoIcon from "@material-ui/icons/Face"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
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
    {items.map(({ label, ...itemProps }, key) => (
      <Button key={key} {...itemProps}>
        {label}
      </Button>
    ))}
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
      <AppBar color="inherit" elevation={0} position="sticky">
        <Toolbar>
          <Home className={classes.home} {...homeItem}></Home>
          <Nav items={navItems} style={{ marginLeft: "auto" }}></Nav>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>{children}</main>
      <footer className={classes.footer}>{footer}</footer>
    </div>
  )
}

export default Layout
