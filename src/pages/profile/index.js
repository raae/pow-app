import React from "react"
import { Link } from "gatsby"
import { Typography, makeStyles } from "@material-ui/core"
import { Alert } from "@material-ui/lab"

import { useQueryParam } from "../../features/utils/useQueryParam"
import { AppLayout, AppPage, AppMainToolbar } from "../../features/app"
import { SettingsCard } from "../../features/settings"

import {
  ProfileCard,
  HouseKeepingCard,
  DangerCard,
  BetaCard,
  PaymentCard,
} from "../../features/profile"
import { useAuth } from "../../features/auth"

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
  const { isAuthenticated } = useAuth()

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
            Check the payment section further down the page.
          </Alert>
        )}

        <ProfileCard
          menuItems={[
            { to: "/profile/email", children: "Change email", component: Link },
            {
              to: "/profile/password",
              children: "Change password",
              component: Link,
            },
          ]}
        />

        {isAuthenticated && (
          <>
            <BetaCard />

            <SettingsCard
              editNavItem={{
                component: Link,
                to: "/tag",
                children: "Change menstruation tag",
              }}
            />

            <PaymentCard />

            <HouseKeepingCard />

            <DangerCard />
          </>
        )}
      </AppPage>
    </AppLayout>
  )
}

export default ProfileIndexPage
