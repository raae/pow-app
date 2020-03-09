import React, { useState } from "react"

import {
  Card,
  CardContent,
  Paper,
  Typography,
  Fab,
  makeStyles,
} from "@material-ui/core"
import EditNoteIcon from "@material-ui/icons/Edit"
import DoneIcon from "@material-ui/icons/Done"
import CancelIcon from "@material-ui/icons/Cancel"

import { useDataState } from "../database"
import { useCycleDayState } from "../cycle"
import { makeDate, formatDate } from "../utils/days"

import Logo from "./Logo"
import EntryForm from "./EntryForm"
import { ForecastText } from "./Forecast"

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    overflow: "initial",
    marginRight: theme.spacing(1),
  },
  title: {
    fontSize: 14,
  },
  noWrap: {
    whiteSpace: "nowrap",
  },
  note: {
    display: "block",
    whiteSpace: "pre-line",
    margin: theme.spacing(3, 0, 3),
    padding: theme.spacing(2),
    background: theme.palette.background.default,
    "&:last-child": {
      marginBottom: theme.spacing(1),
    },
    "& .MuiInputBase-root": {
      background: theme.palette.background.paper,
    },
  },
  tags: {
    margin: theme.spacing(2, 0, 0),
  },
  submit: {
    position: "absolute",
    right: 0,
    bottom: 0,
    transform: "translate(30%, 30%)",
  },
  reset: {
    position: "absolute",
    right: 60,
    bottom: 0,
    transform: "translate(30%, 30%)",
  },
  prediction: {
    padding: theme.spacing(2),
  },
}))

const DaySummary = ({ entryId }) => {
  const classes = useStyles()
  const [isEditing, setIsEditing] = useState(null)
  const { settings, entries } = useDataState()
  const entryNote = entries[entryId] ? entries[entryId].note : ""

  const {
    cycleDay,
    daysBetween,
    daysBetweenCalculated,
    nextStartDate,
    prediction,
    isCurrentCycle,
  } = useCycleDayState({
    date: makeDate(entryId),
    note: entryNote,
  })

  const hasTags = prediction.tags.length > 0

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {formatDate(entryId, "EEEE, MMMM do")}
          </Typography>
          {!isEditing && (
            <Typography variant="h4" component="h2">
              <Logo>Day {cycleDay || "?"}</Logo>
            </Typography>
          )}

          {!isEditing && (
            <>
              <Typography color="textSecondary" gutterBottom>
                of {daysBetweenCalculated ? "your average" : "a default"}{" "}
                {daysBetween || "?"} day cycle.{" "}
              </Typography>
            </>
          )}
          {nextStartDate && isCurrentCycle && !isEditing && (
            <Typography color="textSecondary" gutterBottom>
              Next <strong>#{settings.tag}</strong> estimated to arrive{" "}
              <span className={classes.noWrap}>
                {formatDate(nextStartDate, "EEEE, MMMM do")}.
              </span>
            </Typography>
          )}

          {entryNote && !isEditing && (
            <Paper elevation={0} className={classes.note}>
              <Typography variant="body1" component="p">
                {entryNote}
              </Typography>
            </Paper>
          )}

          {isEditing && (
            <Paper elevation={0} className={classes.note}>
              <EntryForm entryId={entryId} onDone={() => setIsEditing(false)}>
                <Fab
                  color="primary"
                  size="small"
                  aria-label="Cancel not change"
                  type="reset"
                  className={classes.reset}
                >
                  <CancelIcon />
                </Fab>
                <Fab
                  color="secondary"
                  size="large"
                  aria-label="Save note"
                  type="submit"
                  className={classes.submit}
                >
                  <DoneIcon />
                </Fab>
              </EntryForm>
            </Paper>
          )}
          {hasTags && !isEditing && (
            <div className={classes.tags}>
              <ForecastText tags={prediction.tags} />
            </div>
          )}
          {!isEditing && (
            <Fab
              color="secondary"
              size="large"
              aria-label="Edit note"
              onClick={() => setIsEditing(true)}
              className={classes.submit}
            >
              <EditNoteIcon />
            </Fab>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default DaySummary
