import React from "react"
import { useSelector } from "react-redux"
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  makeStyles,
  Chip,
} from "@material-ui/core"

import classNames from "classnames"

import { selectEntryNote, selectIsMenstruationForDate } from "../entries/slice"

import { formatDate, entryIdFromDate } from "../utils/days"
import {
  selectPredictedTagsForDate,
  selectCycleDayForDate,
  selectPredictedMenstruationForDate,
} from "../predictions/slice"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "30rem",
    margin: theme.spacing(2, 0, 4),
  },
  avatar: {
    fontSize: "inherit",
    flexDirection: "column",
    "& span:first-child": {
      fontSize: "0.8em",
      margin: theme.spacing(0.2, 0),
    },
    "& span:last-child": {
      fontWeight: theme.typography.fontWeightBold,
    },
  },
  small: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  isMenstruation: {
    backgroundColor: theme.palette.primary.main,
  },
  predictedMenstruation: {
    backgroundColor: theme.palette.primary.main,
  },
  note: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(1),
    background: theme.palette.background.paper,
  },
  tag: {
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    borderStyle: "dotted",
  },
  loggedTag: {
    borderStyle: "solid",
    borderColor: theme.palette.text.secondary,
  },
}))

export const ForecastText = ({ tags = [] }) => {
  const classes = useStyles()

  return tags
    .sort(({ countA }, { countB }) => countA - countB)
    .map(({ tag, logged }) => {
      return (
        <Chip
          className={classNames(classes.tag, {
            [classes.loggedTag]: logged,
          })}
          variant="outlined"
          size="small"
          key={tag}
          label={`#${tag}`}
          component="span"
        />
      )
    })
}

const ForecastListItem = ({ entryId }) => {
  const classes = useStyles()

  const entryNote = useSelector((state) => selectEntryNote(state, { entryId }))

  const cycleDay = useSelector((state) =>
    selectCycleDayForDate(state, { entryId })
  )

  const isMenstruation = useSelector((state) =>
    selectIsMenstruationForDate(state, { entryId })
  )

  const isPredictedMenstruation = useSelector((state) =>
    selectPredictedMenstruationForDate(state, { entryId })
  )

  const predictionTags = useSelector((state) =>
    selectPredictedTagsForDate(state, { entryId })
  )

  const hasTags = predictionTags && predictionTags.length !== 0
  const hasContent = hasTags || entryNote

  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar
            className={classNames(classes.avatar, {
              [classes.small]: !hasContent,
              [classes.isMenstruation]: isMenstruation,
              [classes.predictedMenstruation]: isPredictedMenstruation,
            })}
          >
            {hasContent && (
              <>
                <span>DAY</span>
                <span>{cycleDay}</span>
              </>
            )}
          </Avatar>
        </ListItemAvatar>
        {hasContent && (
          <ListItemText
            primary={
              <Typography
                component="p"
                variant="body2"
                color="textSecondary"
                gutterBottom
              >
                {formatDate(entryId, "EEEE, MMMM do")}
              </Typography>
            }
            secondary={
              <>
                {entryNote && (
                  <Typography
                    gutterBottom
                    component="span"
                    display="block"
                    variant="body1"
                    className={classes.note}
                  >
                    {entryNote}
                  </Typography>
                )}
                <Typography
                  component="span"
                  variant="body1"
                  color="textSecondary"
                >
                  <ForecastText tags={predictionTags} />
                </Typography>
              </>
            }
          />
        )}
      </ListItem>
    </>
  )
}

const Forecast = ({ interval }) => {
  const classes = useStyles()

  return (
    <>
      <List className={classes.root}>
        {interval.map((date) => {
          const id = entryIdFromDate(date)
          return <ForecastListItem key={id} entryId={id} />
        })}
      </List>
    </>
  )
}

export default Forecast
