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

import { formatDate } from "../utils/days"

import EntryForm from "./EntryForm"

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  content: {
    maxWidth: "50rem",
    margin: "0 auto",
    display: "flex",
    alignContent: "stretch",
    flexDirection: "column",
    height: "100vh",
  },
  appBar: {
    top: 0,
  },
  toolbar: {
    width: "100%",
    maxWidth: "55rem",
    margin: "0 auto",
  },
  title: {
    flexGrow: 1,
  },
  form: {
    padding: theme.spacing(3, 2),
    maxWidth: "32rem",
    flexGrow: 1,
    height: "10rem", // must be set for safari to allow flex grow
    maxHeight: "20rem",
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

const CycleEditPage = ({ date }) => {
  const classes = useStyles()

  const handleDone = () => {
    navigate(`/cycle/${date}`)
  }

  return (
    <div className={classes.content}>
      <div className={classes.offset} />
      <EntryForm entryId={date} onDone={handleDone} className={classes.form}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              type="reset"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {formatDate(date, "MMMM do")}
            </Typography>
            <Button
              type="submit"
              edge="end"
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </Toolbar>
        </AppBar>
      </EntryForm>
    </div>
  )
}

export default CycleEditPage
