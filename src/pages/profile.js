import React, { useEffect } from "react"
import { navigate } from "gatsby"
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  makeStyles,
} from "@material-ui/core"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"

import { Alert } from "@material-ui/lab"
import { Router } from "@reach/router"

import { useAuthState } from "../auth"
import { useDataState } from "../database"
import { CycleProvider } from "../cycle"

import { useQueryParam } from "../utils/useQueryParam"

import SEO from "../components/Seo"
import Loading from "../components/Loading"

import BrandLayout from "../components/BrandLayout"
import Profile from "../components/Profile"
import PaymentForm from "../components/PaymentForm"
import SettingsForm from "../components/SettingsForm"
import { Link } from "../components/Link"
import UserForm from "../components/UserForm"

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

const EditProfile = ({}) => {
  const classes = useStyles() // calling down on you

  const handleDone = (event) => {
    event.preventDefault()
    console.log("handleDone")
    navigate(`/profile/`)
  }

  return (
    <div className={classes.content}>
      <div className={classes.offset} />
      <UserForm variant="update" className={classes.form}>
        <AppBar position="absoulte" className={classes.appBar}>
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
              Profile {}{" "}
            </Typography>
            <Button
              type="submit"
              edge="end"
              variant="contained"
              color="primary"
              onClick={handleDone}
            >
              Update
            </Button>
          </Toolbar>
        </AppBar>
      </UserForm>
    </div>
  )
}

const ProfilePage = () => {
  const paymentStatus = useQueryParam("payment")

  const { user, isPending: authIsPending } = useAuthState()
  const { isPending: dataIsPending, entries, settings } = useDataState()

  useEffect(() => {
    if (!user && !authIsPending) {
      navigate("/login")
    }
  }, [user, authIsPending])

  if (!user || dataIsPending) {
    return (
      <div>
        <SEO title="Loading..." />
        <Loading fullScreen />
      </div>
    )
  }
  // const handleDone = () => {
  //   navigate(`/profile/`)
  // }
  // onDone={handleDone}

  return (
    <CycleProvider entries={entries} settings={settings}>
      <SEO title="Profile" />
      <Router basepath="/profile">
        <EditProfile path="/edit" />
      </Router>
      <BrandLayout variant="app">
        {paymentStatus && (
          <Alert severity="warning">
            Check the payment section at the bottom of the page.
          </Alert>
        )}
        <Box>
          <h1>Profile</h1>
          <Profile />
        </Box>
        <Box my={6}>
          <h1>Help make POW! better</h1>
          <Typography component="div">
            <p>
              It would be very helpful if I could get 30 minutes of your time.
            </p>
            <p>
              <Link href="https://calendly.com/raae/pow-user">
                Follow this link to find a time that works for you (and me).
              </Link>
            </p>
            <p>
              <small>
                The session will be done via Zoom video conferencing, but it can
                be done audio only if that is more comfortable for you. There is
                also no need for you to sign up for an account with Zoom.
              </small>
            </p>
          </Typography>
        </Box>
        <Box my={6}>
          <h1>Settings</h1>
          <SettingsForm />
        </Box>
        <Box my={6}>
          <h1>Payment</h1>
          <PaymentForm standalone />
        </Box>
      </BrandLayout>
    </CycleProvider>
  )
}

export default ProfilePage
