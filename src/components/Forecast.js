import React from "react"
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  ListSubheader,
  makeStyles,
} from "@material-ui/core"

import classNames from "classnames"

import { useCycleDayState } from "../cycle"
import {
  forecastInterval,
  formatDate,
  entryIdFromDate,
  makeDate,
} from "../utils/days"
import { useDataState } from "../database"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "30rem",
    padding: theme.spacing(0, 2),
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
}))

const ForecastText = ({ tags }) => {
  return tags.map(({ tag, frequency }) => {
    return (
      <Typography
        key={tag}
        component="span"
        variant="body1"
        style={{ opacity: frequency + 0.3 }}
      >
        #{tag}{" "}
      </Typography>
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

  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar
            className={classNames(classes.avatar, {
              [classes.small]: prediction.tags.length === 0,
              [classes.isMensturation]: isMensturation,
              [classes.predictedMensturation]: prediction.isMenstruation,
            })}
          >
            {prediction.tags.length !== 0 && (
              <>
                <span>DAY</span>
                <span>{cycleDay}</span>
              </>
            )}
          </Avatar>
        </ListItemAvatar>
        {prediction.tags.length !== 0 && (
          <ListItemText
            primary={
              <Typography
                component="span"
                display="block"
                variant="body2"
                color="textSecondary"
                gutterBottom
              >
                {formatDate(entryId, "EEEE, MMMM do")}
              </Typography>
            }
            secondary={<ForecastText tags={prediction.tags} />}
          />
        )}
      </ListItem>
    </>
  )
}

const Forecast = ({ entryId }) => {
  const classes = useStyles()
  const { daysBetween } = useCycleDayState({
    date: makeDate(entryId),
  })
  const interval = forecastInterval(entryId, daysBetween)

  return (
    <>
      <List
        subheader={
          <ListSubheader component="h3" id="nested-list-subheader">
            Forecast
          </ListSubheader>
        }
        className={classes.root}
      >
        {interval.map((date, index) => {
          const id = entryIdFromDate(date)
          return <ForecastListItem key={id} entryId={id} />
        })}
      </List>
    </>
  )
}

export default Forecast
