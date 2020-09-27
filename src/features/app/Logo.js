import React from "react"
import { Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: `'Seymour One', ${theme.typography.h1.fontFamily}`,
    fontWeight: 900,
    fontSize: "inherit",
    color: theme.palette.primary.main,
    lineHeight: 1.5,
    display: "inline-block",
    textDecoration: "none",
    textStroke: `0.02em ${theme.palette.text.primary}`,
  },
}))

const Logo = ({ children, ...props }) => {
  const classes = useStyles()

  return (
    <Typography
      component={props.component || "span"}
      {...props}
      className={classes.root}
    >
      {children}
    </Typography>
  )
}

export default Logo
