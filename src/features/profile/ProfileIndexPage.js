import React from "react"
import { Link } from "gatsby"
import { Typography, makeStyles } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useQueryParam } from "../utils/useQueryParam"

import { AppLayout, AppPage, AppMainToolbar } from "../app"
import { SettingsCard } from "../settings"

import ProfileCard from "./ProfileCard"
import HouseKeepingCard from "./HouseKeepingCard"
import DangerCard from "./DangerCard"
import BetaCard from "./BetaCard"
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

        <HouseKeepingCard />

        <ProfileCard />

        <BetaCard />

        <SettingsCard
          editNavItem={{
            component: Link,
            to: "/tag",
            children: "Change menstruation tag",
          }}
        />

        <PaymentCard />

        <DangerCard />
      </AppPage>
    </AppLayout>
  )
}

export default ProfileIndexPage
