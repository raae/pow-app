import React from "react"
import { Typography, makeStyles } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useQueryParam } from "../utils/useQueryParam"

import { AppLayout, AppPage, AppMainToolbar } from "../app"

import ProfileCard from "./ProfileCard"
import DangerCard from "./DangerCard"
import BetaCard from "./BetaCard"
import SettingsCard from "./SettingsCard"
import PaymentCard from "./PaymentCard"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(4),
    },
  },
}))

const ProfileIndexPage = () => {
  const classes = useStyles()
  const paymentStatus = useQueryParam("payment")

  return (
    <AppLayout>
      <AppMainToolbar>
        <Typography variant="h6" component="h1">
          Profile
        </Typography>
      </AppMainToolbar>

      <AppPage className={classes.root}>
        {paymentStatus && (
          <Alert severity="warning">
            Check the payment section at the bottom of the page.
          </Alert>
        )}

        <ProfileCard />

        <BetaCard />

        <SettingsCard />

        <PaymentCard />

        <DangerCard />
      </AppPage>
    </AppLayout>
  )
}

export default ProfileIndexPage
