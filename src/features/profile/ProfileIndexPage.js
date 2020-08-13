import React from "react"
import { Box } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { BrandLayout } from "../brand"
import ProfileCard from "./ProfileCard"
import PaymentForm from "../payment/PaymentForm"
import SettingsForm from "../settings/SettingsForm"
import { Link } from "../navigation"
import { useQueryParam } from "../utils/useQueryParam"
import { Typography } from "@material-ui/core"

const ProfileIndexPage = () => {
  const paymentStatus = useQueryParam("payment")

  return (
    <BrandLayout variant="app">
      {paymentStatus && (
        <Alert severity="warning">
          Check the payment section at the bottom of the page.
        </Alert>
      )}
      <Box>
        <h1>Profile</h1>
        <ProfileCard />
      </Box>
      <Box my={6}>
        <h1>Help make POW! better</h1>
        <Typography component="div">
          <p>
            It would be very helpful if I could get 30 minutes of your time.
          </p>
          <p>
            <Link href="https://calendly.com/raae/pow-user">
              Follow this link to find a time that works for you (and me).
            </Link>
          </p>
          <p>
            <small>
              The session will be done via Zoom video conferencing, but it can
              be done audio only if that is more comfortable for you. There is
              also no need for you to sign up for an account with Zoom.
            </small>
          </p>
        </Typography>
      </Box>
      <Box my={6}>
        <h1>Settings</h1>
        <SettingsForm />
      </Box>
      <Box my={6}>
        <h1>Payment</h1>
        <PaymentForm standalone />
      </Box>
    </BrandLayout>
  )
}

export default ProfileIndexPage
