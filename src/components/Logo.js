import React from "react"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: `'Seymour One', ${theme.typography.h1.fontFamily}`,
    fontWeight: 900,
    color: theme.palette.primary.main,
    lineHeight: 1.5,
    display: "inline-block",
  },
}))

const Logo = ({ children }) => {
  const classes = useStyles()

  return <span className={classes.root}>{children}</span>
}

export default Logo
