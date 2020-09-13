import React from "react"
import PropTypes from "prop-types"
import { Button, IconButton, makeStyles } from "@material-ui/core"
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons"

import AppToolbar from "./AppToolbar"

const useStyles = makeStyles(() => ({
  root: {
    flexDirection: "row-reverse",
    "& > *:first-child": {
      marginLeft: "auto",
    },
  },
}))

const AppEditToolbar = ({ children }) => {
  const classes = useStyles()
  return (
    <AppToolbar className={classes.root}>
      <Button type="submit" edge="end" variant="contained" color="primary">
        Done
      </Button>

      {children}

      <IconButton type="reset" edge="start" color="inherit" aria-label="cancel">
        <ArrowBackIcon />
      </IconButton>
    </AppToolbar>
  )
}

AppEditToolbar.propTypes = {
  children: PropTypes.node,
}

export default AppEditToolbar
