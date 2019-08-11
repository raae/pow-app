import React from "react"
import { Button, Container, Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  actions: {
    textAlign: "center",
    margin: theme.spacing(2),
  },
}))

const Profile = ({ user, signOut }) => {
  const classes = useStyles()

  if (!user) return null

  return (
    <Container>
      <Typography variant="h4" component="h1" align="center">
        {user.username}
      </Typography>
      <div className={classes.actions}>
        <Button variant="outlined" size="small" onClick={signOut}>
          Sign Out
        </Button>
      </div>
    </Container>
  )
}

export default Profile
