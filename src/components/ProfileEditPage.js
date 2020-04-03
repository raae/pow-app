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

import UserForm from "./UserForm"

// const useStyles = ...
const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  content: {
    maxWidth: "50rem",
    margin: "0 auto",
    alignContent: "stretch",
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
    minHeight: "10rem",
    height: "80vh",
    maxHeight: "25rem",

    "& > div": {
      height: "90%",
      "& > div": {
        height: "100%",
        "& > textarea": {
          height: "100% !important",
        },
      },
    },
  },
}))

const ProfileEditPage = ({ variant }) => {
  const classes = useStyles()

  const handleDone = () => {
    // event.preventDefault()

    navigate(`/profile/`)
    console.log("handleDone")
  }

  return (
    <div className={classes.content}>
      <div className={classes.offset} />
      <UserForm variant="update" onDone={handleDone} className={classes.form}>
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
              ProfileEditPage
            </Typography>
            <Button
              type="submit"
              edge="end"
              variant="contained"
              color="primary"
            >
              Update
            </Button>
          </Toolbar>
        </AppBar>
      </UserForm>
    </div>
  )
}

export default ProfileEditPage
