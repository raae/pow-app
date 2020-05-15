import React from "react"
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
  Divider,
  Chip,
} from "@material-ui/core"

import classNames from "classnames"

import { useCycleDayState } from "../cycle"
import {
  formatDate,
  entryIdFromDate,
  makeDate,
  isDateToday,
} from "../utils/days"
import { useDataState } from "../database"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "30rem",
    margin: theme.spacing(2, 0, 4),
  },
  forecast: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(2, 0),
    position: "relative",
    padding: theme.spacing(2, 3),
  },
  isToday: {
    boxShadow: theme.shadows[2],
  },
  aside: {
    position: "absolute",
    right: 0,
    top: 0,
    "& > span": {
      ...theme.typography.overline,
      fontSize: "0.6rem",

      display: "block",
      padding: theme.spacing(0, 1),

      "&:first-child": {
        borderBottomLeftRadius: theme.shape.borderRadius / 2,
        borderTopRightRadius: theme.shape.borderRadius,

        backgroundColor: theme.palette.grey[200],
        color: theme.palette.getContrastText(theme.palette.grey[200]),

        fontWeight: theme.typography.fontWeightMedium,

        "&.isMenstruation": {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.getContrastText(theme.palette.primary.main),
        },
        "&.predictedMenstruation": {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.getContrastText(theme.palette.primary.main),
          // color: theme.palette.getContrastText(theme.palette.primary.main),
        },
      },
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: "0.75em",
    marginLeft: theme.spacing(1),
  },

  note: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(1),
    background: theme.palette.background.paper,
  },
  tag: {
    marginRight: theme.spacing(0.5),
  },
  divider: {
    display: "block",
    "&:after": {
      backgroundColor: "#000",
      content: "TEST",
      display: "inline-block",
      height: 1,
      position: "relative",
      verticalAlign: "middle",
      width: "50%",
    },
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

  const isToday = isDateToday(entryId)

  // const hasContent = isToday || prediction.tags.length !== 0 || entryNote
  const hasContent = true

  return (
    <ListItem
      className={classNames(classes.forecast, { [classes.isToday]: isToday })}
    >
      <aside className={classes.aside}>
        <span
          className={classNames(classes.cycleDay, {
            isMenstruation: isMensturation,
            predictedMenstruation: prediction.isMenstruation,
          })}
        >
          Day {cycleDay}
        </span>
        {isToday && <span>Today</span>}
      </aside>
      {hasContent && (
        <ListItemText
          primary={
            <Typography
              component="p"
              variant="overline"
              color="textSecondary"
              gutterBottom
            >
              {formatDate(entryId, "EEEE, MMMM do")}
              {isToday && <span> (Today)</span>}
            </Typography>
          }
          secondary={
            <>
              {entryNote && (
                <Typography
                  gutterBottom
                  component="span"
                  display="block"
                  variant="body2"
                  color="textPrimary"
                >
                  {entryNote}
                </Typography>
              )}
              {prediction.tags.length > 0 && (
                <Typography variant="caption" className={classes.divider}>
                  Predictions
                </Typography>
              )}
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
              >
                <ForecastText tags={prediction.tags} />
              </Typography>
            </>
          }
        />
      )}
    </ListItem>
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
