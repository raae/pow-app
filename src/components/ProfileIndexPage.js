import React from "react"
import ProfileRouter from "../components/ProfileRouter"
import { Link as GatsbyLink } from "gatsby"
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Typography,
  FormControlLabel,
  Switch,
  Fab,
  makeStyles,
} from "@material-ui/core"
// import AccountCircle from "@material-ui/icons/AccountCircle"
import EditNoteIcon from "@material-ui/icons/Edit"

// <Card>
//       <CardHeader
const ProfileIndexPage = () => {
  return (
    <Card>
      <div>yo</div>
      <CardHeader
        action={
          <Fab
            color="secondary"
            size="large"
            aria-label="Edit note"
            component={GatsbyLink}
            to={`/profile/edit`}
            // className={classes.submit}
          >
            <EditNoteIcon />
          </Fab>
        }
      />
      <ProfileRouter />
    </Card>
  )
}

export default ProfileIndexPage
