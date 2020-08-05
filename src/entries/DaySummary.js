import React from "react"
import { useSelector } from "react-redux"
import { Link as GatsbyLink } from "gatsby"

import {
  Card,
  CardContent,
  Paper,
  Typography,
  Fab,
  makeStyles,
} from "@material-ui/core"
import EditNoteIcon from "@material-ui/icons/Edit"

import { selectEntryNote } from "../entries/slice"
import { selectMenstruationTag } from "../settings/slice"

import { formatDate } from "../utils/days"

import Logo from "../app/Logo"
import { ForecastText } from "./Forecast"
import {
  selectDaysBetween,
  selectIsDaysBetweenCalculated,
  selectCycleDayForDate,
  selectIsDateCurrentCycle,
  selectPredictedTagsForDate,
  selectNextStartDate,
} from "../predictions/slice"

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

  const entryNote = useSelector((state) => selectEntryNote(state, { entryId }))
  const menstruationTag = useSelector(selectMenstruationTag)
  const daysBetween = useSelector(selectDaysBetween)
  const isDaysBetweenCalculated = useSelector(selectIsDaysBetweenCalculated)
  const cycleDay = useSelector((state) =>
    selectCycleDayForDate(state, { entryId })
  )
  const isCurrentCycle = useSelector((state) =>
    selectIsDateCurrentCycle(state, { entryId })
  )
  const nextStartDate = useSelector((state) =>
    selectNextStartDate(state, { entryId })
  )
  const predictedTags = useSelector((state) =>
    selectPredictedTagsForDate(state, { entryId })
  )

  const hasTags = predictedTags && predictedTags.length > 0

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
            of {isDaysBetweenCalculated ? "your average" : "a default"}{" "}
            {daysBetween || "?"} day cycle.{" "}
          </Typography>

          {nextStartDate && isCurrentCycle && (
            <Typography color="textSecondary" gutterBottom>
              Next <strong>#{menstruationTag}</strong> estimated to arrive{" "}
              <span className={classes.noWrap}>
                {formatDate(nextStartDate, "EEEE, MMMM do")}.
              </span>
            </Typography>
          )}

          {entryNote && (
            <Paper elevation={0} className={classes.note}>
              <Typography variant="body1" component="p">
                {entryNote}
              </Typography>
            </Paper>
          )}

          {hasTags && (
            <div className={classes.tags}>
              <ForecastText tags={predictedTags} />
            </div>
          )}

          <Fab
            color="secondary"
            size="large"
            aria-label="Edit note"
            component={GatsbyLink}
            to={`/cycle/${entryId}/edit`}
            className={classes.submit}
          >
            <EditNoteIcon />
          </Fab>
        </CardContent>
      </Card>
    </>
  )
}

export default DaySummary
