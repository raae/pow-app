import React, { useEffect } from "react"
import { navigate } from "gatsby"

import { useAuthState } from "../auth"
import { useDataState } from "../database"
import { CycleProvider } from "../cycle"

import SEO from "../components/Seo"
import Loading from "../components/Loading"

import BrandLayout from "../components/BrandLayout"
import Profile from "../components/Profile"
import PaymentForm from "../components/PaymentForm"
import SettingsForm from "../components/SettingsForm"

import { Box } from "@material-ui/core"

import { useQueryParam } from "../utils/useQueryParam"

const ProfilePage = () => {
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
        <Box>
          <h1>Profile</h1>
          <Profile />
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
