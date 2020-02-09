import React from "react"
import { Link } from "@reach/router"

import { Button, IconButton, makeStyles } from "@material-ui/core"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import ArrowForwardIcon from "@material-ui/icons/ArrowForward"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
  },
}))

const Navigation = ({ next = {}, prev = {} }) => {
  const classes = useStyles()
  return (
    <nav className={classes.root}>
      {prev.path && (
        <Button
          color="default"
          disabled={prev.disabled}
          component={Link}
          to={prev.path}
          startIcon={<ArrowBackIcon />}
        />
      )}
      {next.path && (
        <Button
          color="primary"
          variant="outlined"
          disabled={next.disabled}
          component={Link}
          to={next.path}
          onClick={next.onClick}
          endIcon={<ArrowForwardIcon />}
        >
          {next.label}
        </Button>
      )}
    </nav>
  )
}

export default Navigation
