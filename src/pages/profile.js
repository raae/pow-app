import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { Box, Typography } from "@material-ui/core"
import { Alert } from "@material-ui/lab"

import { useAuthState } from "../auth"
import { useDataState } from "../database"
import { CycleProvider } from "../cycle"

import { useQueryParam } from "../utils/useQueryParam"

import SEO from "../components/Seo"
import Loading from "../components/Loading"

import BrandLayout from "../components/BrandLayout"
import Profile from "../components/Profile"
import PaymentForm from "../components/PaymentForm"
import SettingsForm from "../components/SettingsForm"
import { Link } from "../components/Link"

const ProfilePage = () => {
  const paymentStatus = useQueryParam("payment")

  const { user, isPending: authIsPending } = useAuthState()
  const { isPending: dataIsPending, entries, settings } = useDataState()

  useEffect(() => {
    if (!user && !authIsPending) {
      navigate("/login")
    }
  }, [user, authIsPending])

  if (!user || dataIsPending) {
    return (
      <>
        <SEO title="Loading..." />
        <Loading fullScreen />
      </>
    )
  }

  return (
    <CycleProvider entries={entries} settings={settings}>
      <SEO title="Profile" />
      <BrandLayout variant="app">
        {paymentStatus && (
          <Alert severity="warning">
            Check the payment section at the bottom of the page.
          </Alert>
        )}
        <Box>
          <h1>Profile</h1>
          <Profile />
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
    </CycleProvider>
  )
}

export default ProfilePage
