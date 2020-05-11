import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { Router } from "@reach/router"

import { useAuthState } from "../auth"
import { useDataState } from "../database"
import { CycleProvider } from "../cycle"

import SEO from "../components/Seo"
import Loading from "../components/Loading"

import ProfileIndexPage from "../components/ProfileIndexPage"
import ProfileEditEmailPage from "../components/ProfileEditEmailPage"
import ProfileEditnamePage from "../components/ProfileEditPOWnamePage"
import ProfileEditEmailPage3 from "../components/ProfileEditEmailPage3"

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
        <ProfileEditEmailPage path="/email" />
        <ProfileEditEmailPage3 path="/epost" />
        <ProfileEditnamePage path="/username" />
      </Router>
    </CycleProvider>
  )
}

export default ProfilePage
