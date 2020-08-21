import React from "react"
import { navigate } from "gatsby"

import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"

import { formatDate, makeDate } from "../utils/days"

import { EntryForm } from "../entries"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "50rem",
    margin: "0 auto",
    alignContent: "stretch",
  },
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    maxWidth: "35em",
  },
  appBar: {
    top: 0,
  },
  toolbar: {
    width: "100%",
    maxWidth: "55rem",
    margin: "0 auto",
    flexDirection: "row-reverse",
  },
  title: {
    flexGrow: 1,
  },
  form: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    maxWidth: "35em",

    minHeight: "10rem",
    maxHeight: "17rem",
    height: "80vh",

    "& > div": {
      height: "100%",
      "& > div": {
        height: "100%",
        "& > textarea": {
          height: "100% !important",
        },
      },
    },
  },
}))

const CycleEditPage = ({ entryId }) => {
  const classes = useStyles()
  const date = makeDate(entryId)

  const handleDone = () => {
    navigate(`/cycle/${entryId}`)
  }

  return (
    <div className={classes.root}>
      <Toolbar />

      <EntryForm entryId={entryId} onDone={handleDone} className={classes.form}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Button
              type="submit"
              edge="end"
              variant="contained"
              color="primary"
            >
              Done
            </Button>
            <Typography variant="h6" className={classes.title}>
              {formatDate(date, "MMMM do")}
            </Typography>
            <IconButton
              type="reset"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <ArrowBackIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </EntryForm>
    </div>
  )
}

export default CycleEditPage
