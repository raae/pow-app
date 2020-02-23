import React from "react"
import {
  Link,
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core"

import MenstruationSettings from "./MenstruationSettings"

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(3),
    "& + *": {
      marginTop: theme.spacing(2),
    },
  },
}))

const Profile = ({ user }) => {
  const classes = useStyles()

  if (!user) return null

  return (
    <>
      <Container className={classes.container} maxWidth="sm">
        <Card>
          <CardHeader title={user.username} />
        </Card>
      </Container>
      <Container className={classes.container} maxWidth="sm">
        <MenstruationSettings />
      </Container>
      <Container className={classes.container} maxWidth="sm">
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              Stay in the loop
            </Typography>
            <Typography gutterBottom variant="body1">
              Sign up for the{" "}
              <Link
                target="_blank"
                rel="noopener"
                href="https://lillylabs.ck.page/a5f42d2b44"
              >
                POW! Newsletter
              </Link>
              .
            </Typography>
            <Typography gutterBottom variant="body2" color="textSecondary">
              We send you off to another site to sign up. Your Blockstack id is
              not forwarded and not be linked to the e-mail you submit.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default Profile
