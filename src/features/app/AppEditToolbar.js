import React from "react"
import PropTypes from "prop-types"
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  makeStyles,
} from "@material-ui/core"
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons"

const useStyles = makeStyles(() => ({
  toolbar: {
    flexDirection: "row-reverse",
    "& > *:first-child": {
      marginLeft: "auto",
    },
  },
}))

const AppEditToolbar = ({ children, disabled }) => {
  const classes = useStyles()
  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <Button
          type="submit"
          edge="end"
          variant="contained"
          color="primary"
          disabled={disabled}
        >
          Done
        </Button>

        {children}

        <IconButton
          type="reset"
          edge="start"
          color="inherit"
          aria-label="cancel"
          disabled={disabled}
        >
          <ArrowBackIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

AppEditToolbar.propTypes = {
  children: PropTypes.node,
}

export default AppEditToolbar
