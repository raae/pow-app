import React from "react"
import { Link } from "gatsby"

import { Paper, Button, Typography, makeStyles } from "@material-ui/core"

import { useDataState } from "../database"
import { useCycleDayState } from "../cycle"
import { formatDate } from "../utils/days"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(2),

    "& a": {
      marginTop: theme.spacing(1),
    },
  },
}))

const NoMenstruationTagSetting = () => {
  return (
    <>
      <Typography gutterBottom>
        Let POW! know the tag you use to indicate menstruation to get
        personalized predictions.
      </Typography>
      <Button
        variant="outlined"
        color="secondary"
        to="/app/settings"
        size="small"
        component={Link}
      >
        Configure tag
      </Button>
    </>
  )
}

const NotEnoughData = () => {
  return (
    <Typography>
      There is not enough data yet to give you personalized predictions. Keep on
      tracking.
    </Typography>
  )
}

const NextNote = ({ nextStartDate, tag }) => {
  if (!nextStartDate) return null

  return (
    <Typography gutterBottom>
      Next <strong>#{tag}</strong> is coming around{" "}
      <strong>{formatDate(nextStartDate, "eeee MMMM do")}</strong>.
    </Typography>
  )
}

const CycleDayNote = ({ cycleDay, daysBetween }) => {
  if (!cycleDay) return null
  return (
    <Typography gutterBottom>
      Your are on day <strong>{cycleDay}</strong> of{" "}
      <strong>{daysBetween}</strong>.
    </Typography>
  )
}

const MenstruationNote = () => {
  const classes = useStyles()
  const { settings } = useDataState()
  const { cycleDay, daysBetween, nextStartDate } = useCycleDayState({
    date: new Date(),
  })

  let note = <NotEnoughData />
  if (cycleDay || nextStartDate) {
    note = (
      <>
        <CycleDayNote
          cycleDay={cycleDay}
          daysBetween={daysBetween}
        ></CycleDayNote>
        <NextNote nextStartDate={nextStartDate} tag={settings.tag}></NextNote>
      </>
    )
  } else if (!settings.tag) {
    note = <NoMenstruationTagSetting />
  }
  return (
    <Paper elevation={3} square={true} className={classes.root}>
      {note}
    </Paper>
  )
}

export default MenstruationNote
