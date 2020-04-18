import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { Router } from "@reach/router"

import { useAuthState } from "../auth"
import { useDataState } from "../database"
import { CycleProvider } from "../cycle"

import { useQueryParam } from "../utils/useQueryParam"

import SEO from "../components/Seo"
import Loading from "../components/Loading"

import ProfileIndexPage from "../components/ProfileIndexPage"
import ProfileEditPage3 from "../components/ProfileEditPage3"

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
      <div>
        <SEO title="Loading..." />
        <Loading fullScreen />
      </div>
    )
  }

  return (
    <CycleProvider entries={entries} settings={settings}>
      <SEO title="Profile" />

      <Router basepath="/profile">
        <ProfileIndexPage path="/" />
        <ProfileEditPage3 path="/edit" />
      </Router>
    </CycleProvider>
  )
}

export default ProfilePage
