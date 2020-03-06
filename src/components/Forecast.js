import React from "react"
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

import { useCycleDayState } from "../cycle"
import { formatDate, entryIdFromDate, makeDate } from "../utils/days"
import { useDataState } from "../database"

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
  isMensturation: {
    backgroundColor: theme.palette.primary.main,
  },
  predictedMensturation: {
    backgroundColor: theme.palette.primary.main,
  },
  note: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(1),
    background: theme.palette.background.paper,
  },
  tag: {
    marginRight: theme.spacing(0.5),
  },
}))

export const ForecastText = ({ tags }) => {
  const classes = useStyles()

  return tags.map(({ tag, frequency }) => {
    return (
      <Chip
        className={classes.tag}
        variant="outlined"
        size="small"
        key={tag}
        label={`#${tag}`}
        component="span"
        style={{ opacity: frequency + 0.3 }}
      />
    )
  })
}

const ForecastListItem = ({ entryId }) => {
  const classes = useStyles()

  const { entries } = useDataState()
  const entryNote = entries[entryId] ? entries[entryId].note : ""

  const { cycleDay, isMensturation, prediction } = useCycleDayState({
    date: makeDate(entryId),
    note: entryNote,
  })

  const hasContent = prediction.tags.length !== 0 || entryNote

  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar
            className={classNames(classes.avatar, {
              [classes.small]: !hasContent,
              [classes.isMensturation]: isMensturation,
              [classes.predictedMensturation]: prediction.isMenstruation,
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
                  <ForecastText tags={prediction.tags} />
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
