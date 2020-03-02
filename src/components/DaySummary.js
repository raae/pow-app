import React from "react"

import {
  Card,
  CardContent,
  Paper,
  Typography,
  Fab,
  makeStyles,
} from "@material-ui/core"
import EditNoteIcon from "@material-ui/icons/Edit"

import { useDataState } from "../database"
import { useCycleDayState } from "../cycle"
import { makeDate, formatDate } from "../utils/days"

import Logo from "./Logo"

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    overflow: "initial",
  },
  title: {
    fontSize: 14,
  },
  note: {
    margin: theme.spacing(3, 0, 1),
    padding: theme.spacing(2),
    background: theme.palette.background.default,
  },
  fab: {
    position: "absolute",
    right: 0,
    bottom: 0,
    transform: "translate(30%, 30%)",
  },
  prediction: {
    padding: theme.spacing(2),
  },
}))

const DaySummary = ({ entryId }) => {
  const classes = useStyles()
  const { settings, entries } = useDataState()
  const entry = entries[entryId] || {}

  const { cycleDay, daysBetween, nextStartDate, prediction } = useCycleDayState(
    {
      date: makeDate(entryId),
      note: entry.note,
    }
  )

  if (!settings.tag) {
    return null
  }

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {formatDate(entryId, "EEEE, MMMM do")}
          </Typography>
          <Typography variant="h4" component="h2">
            <Logo>Day {cycleDay || "?"}</Logo>
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            of your average {daysBetween || "?"} day cycle
          </Typography>
          {nextStartDate && (
            <Typography color="textSecondary" gutterBottom>
              Next <strong>#{settings.tag}</strong> due to arrive{" "}
              {formatDate(nextStartDate, "EEEE, MMMM do")}
            </Typography>
          )}

          {entry.note && (
            <Paper elevation={0} className={classes.note}>
              <Typography variant="body1" component="p">
                {entry.note}
              </Typography>
            </Paper>
          )}
        </CardContent>
        <Fab
          color="secondary"
          size="medium"
          aria-label="Edit note"
          className={classes.fab}
        >
          <EditNoteIcon />
        </Fab>
      </Card>
    </>
  )
}

export default DaySummary
