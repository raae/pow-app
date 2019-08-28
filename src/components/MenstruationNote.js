import React from "react"
import { Link } from "gatsby"
import { format } from "date-fns"

import { Paper, Button, Typography, makeStyles } from "@material-ui/core"

import useSettings from "../store/useSettings"
import usePredictions from "../store/usePredictions"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    zIndex: 10,
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
        to="/settings"
        size="small"
        fullWidth
        component={Link}
      >
        Configure tag
      </Button>
    </>
  )
}

const NotEnoughData = () => {
  return (
    <>
      <Typography gutterBottom>
        There is not enough data yet to give you personalized predictions. Keep
        on tracking.
      </Typography>
    </>
  )
}

const NextMenstruation = ({ cycleDay, nextMenstruation, tag }) => {
  return (
    <>
      <Typography gutterBottom>
        Your are on day <strong>{cycleDay}</strong> of your current cycle.
      </Typography>
      <Typography gutterBottom>
        Next <strong>#{tag}</strong> is coming around{" "}
        <strong>{format(nextMenstruation, "eeee MMMM do")}</strong>.
      </Typography>
    </>
  )
}

const MenstruationNote = ({}) => {
  const classes = useStyles()
  const [{ menstruationSettings }] = useSettings()
  const [{ currentCycleDay, nextMenstruation }] = usePredictions()

  let note = <NotEnoughData />
  if (currentCycleDay) {
    note = (
      <NextMenstruation
        cycleDay={currentCycleDay}
        nextMenstruation={nextMenstruation}
        tag={menstruationSettings.tag}
      ></NextMenstruation>
    )
  } else if (!menstruationSettings.tag) {
    note = <NoMenstruationTagSetting />
  }
  return (
    <Paper elevation={3} square={true} className={classes.root}>
      {note}
    </Paper>
  )
}

export default MenstruationNote
