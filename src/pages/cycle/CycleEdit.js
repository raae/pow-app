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

import EntryForm from "../../components/EntryForm"

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

const CycleEditPage = ({ date }) => {
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

export default CycleEditPage
