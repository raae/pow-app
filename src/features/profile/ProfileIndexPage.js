import React from "react"
import { Box } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { AppLayout, AppPage, AppMainToolbar } from "../app"
import { PaymentForm } from "../payment"
import { useQueryParam } from "../utils/useQueryParam"
import { Typography } from "@material-ui/core"

import ProfileCard from "./ProfileCard"
import DangerCard from "./DangerCard"
import BetaCard from "./BetaCard"
import SettingsCard from "./SettingsCard"

const ProfileIndexPage = () => {
  const paymentStatus = useQueryParam("payment")

  return (
    <AppLayout>
      <AppMainToolbar>
        <Typography variant="h6" component="h1">
          Profile
        </Typography>
      </AppMainToolbar>

      <AppPage>
        {paymentStatus && (
          <Alert severity="warning">
            Check the payment section at the bottom of the page.
          </Alert>
        )}

        <ProfileCard />

        <BetaCard />

        <SettingsCard />

        <Box my={6}>
          <h1>Payment</h1>
          <PaymentForm standalone />
        </Box>

        <DangerCard />
      </AppPage>
    </AppLayout>
  )
}

export default ProfileIndexPage
