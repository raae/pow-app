import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { Router } from "@reach/router"

import { selectAuthUser, selectAuthIsPending } from "../auth/slice"
import { selectEntries, selectAreEntriesInitialized } from "../entries/slice"
import {
  selectSettingsById,
  selectAreSettingsInitialized,
} from "../settings/slice"
import { CycleProvider } from "../cycle"

import SEO from "../components/Seo"
import Loading from "../components/Loading"

import ProfileIndexPage from "../components/ProfileIndexPage"
import ProfileEditEmailPage from "../components/ProfileEditEmailPage"
import { useSelector } from "react-redux"

const ProfilePage = () => {
  const user = useSelector(selectAuthUser)
  const authIsPending = useSelector(selectAuthIsPending)
  const entries = useSelector(selectEntries)
  const settings = useSelector(selectSettingsById)
  const entriesAreInitialized = useSelector(selectAreEntriesInitialized)
  const settingsAreInitialized = useSelector(selectAreSettingsInitialized)

  const dataIsPending = !entriesAreInitialized || !settingsAreInitialized

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
        <ProfileEditEmailPage path="/edit" />
      </Router>
    </CycleProvider>
  )
}

export default ProfilePage
