import React from "react"
import { Link } from "gatsby"

import { Paper, Button, Typography, makeStyles } from "@material-ui/core"

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

const MenstruationNote = ({ menstruationSettings }) => {
  const classes = useStyles()
  return (
    <Paper elevation={3} square={true} className={classes.root}>
      {!menstruationSettings.tag && <NoMenstruationTagSetting />}
      {menstruationSettings.tag && <NotEnoughData />}
    </Paper>
  )
}

export default MenstruationNote
