import React from "react"
import { Link } from "gatsby"

import MenuIcon from "@material-ui/icons/Menu"
import {
  AppBar,
  Button,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Toolbar,
  makeStyles,
} from "@material-ui/core"

import AppFooter from "./AppFooter"
import appFooterItems from "./appNavFooterItems"
import appMainItems from "./appNavMainItems"
import AppBarMenu from "./AppBarMenu"

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  logo: {
    fontSize: "1.5rem",
    fontFamily: `'Seymour One', ${theme.typography.h1.fontFamily}`,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.main,
  },
  footer: {
    textAlign: "center",
    padding: theme.spacing(2),
  },
  pushDown: {
    marginTop: "auto",
  },
  toolbar: theme.mixins.toolbar,
  drawer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    "& svg": {
      color: "currentColor",
    },
    "& button:nth-child(2)": {
      marginLeft: "auto",
    },
  },
  aside: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    zIndex: 10,
    [theme.breakpoints.up("md")]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    alignItems: "stretch",
    display: "flex",
    flexDirection: "column",
  },
}))

const ListItems = ({ items = [] }) => {
  return items.map(({ label, text, icon, ...itemProps }, index) => (
    <ListItem button key={index} {...itemProps}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={label} secondary={text} />
    </ListItem>
  ))
}

function AppLayout({ children, appBarItems, aside }) {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div className={classes.drawer}>
      <Toolbar>
        <Button to="/app" className={classes.logo} component={Link}>
          POW!
        </Button>
      </Toolbar>
      <Divider />
      <List>
        <ListItems items={appMainItems} />
      </List>

      <Divider className={classes.pushDown} />
      <footer>
        <List>
          <ListItems items={appFooterItems} />
        </List>
        <Divider />
        <div className={classes.footer}>
          <AppFooter></AppFooter>
        </div>
      </footer>
    </div>
  )

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <AppBarMenu items={appBarItems}></AppBarMenu>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden mdUp implementation="js">
          <Drawer
            variant="temporary"
            anchor={"left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="js">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
      <aside className={classes.aside}>{aside}</aside>
    </div>
  )
}

export default AppLayout
