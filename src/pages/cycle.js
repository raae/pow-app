import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { Router } from "@reach/router"
import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"

import { useAuthState } from "../auth"
import { useDataState } from "../database"
import { CycleProvider, useCycleDayState } from "../cycle"

import { entryIdFromDate, makeDate, intervalAfterDate } from "../utils/days"

import SEO from "../components/Seo"
import Loading from "../components/Loading"
import BrandLayout from "../components/BrandLayout"
import DaySummary from "../components/DaySummary"
import Forecast from "../components/Forecast"
import DatePicker from "../components/DatePicker"
import Welcome from "../components/Welcome"
import EntryForm from "../components/EntryForm"

const Day = ({ date }) => {
  date = makeDate(date)
  const entryId = entryIdFromDate(date)

  const { daysBetween } = useCycleDayState({
    date: makeDate(entryId),
  })

  const afterInterval = intervalAfterDate(entryId, daysBetween + 3)

  return (
    <BrandLayout variant="app" toolbar={<DatePicker entryId={entryId} />}>
      <DaySummary entryId={entryId} />
      <Welcome />
      <Forecast entryId={entryId} interval={afterInterval} />
    </BrandLayout>
  )
}

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  appBar: {
    top: 0,
  },
  title: {
    flexGrow: 1,
  },
  form: {
    padding: theme.spacing(3, 2),
  },
}))

const Edit = ({ date }) => {
  const classes = useStyles()

  const handleDone = () => {
    navigate(`/cycle/${date}`)
  }

  return (
    <>
      <div className={classes.offset} />
      <EntryForm entryId={date} onDone={handleDone} className={classes.form}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              type="reset"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" align="center" className={classes.title}>
              {date}
            </Typography>
            <Button type="submit" edge="end" variant="outlined" color="inherit">
              Save
            </Button>
          </Toolbar>
        </AppBar>
      </EntryForm>
    </>
  )
}

const HomeRoute = () => {
  const { user, isPending: authIsPending } = useAuthState()
  const { isPending: dataIsPending, entries, settings } = useDataState()
  const hasPaid =
    user && user.protectedProfile && user.protectedProfile.stripeCustomerId

  useEffect(() => {
    if (!user && !authIsPending) {
      navigate("/login")
    } else if (!hasPaid && !authIsPending) {
      navigate("/profile?payment=unfinished")
    }
  }, [user, authIsPending, hasPaid])

  if (!user || !hasPaid || dataIsPending) {
    return (
      <>
        <SEO title="Loading..." />
        <Loading fullScreen />
      </>
    )
  }

  return (
    <CycleProvider entries={entries} settings={settings}>
      <SEO title="Cycle" />
      <Router basepath="/cycle">
        <Day path="/" />
        <Day path=":date" />
        <Edit path=":date/edit" />
      </Router>
    </CycleProvider>
  )
}

export default HomeRoute
