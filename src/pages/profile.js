import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { navigate } from "gatsby"
import { Router } from "@reach/router"

import { selectAuthIsPending, selectIsAuthenticated } from "../features/auth"
import { selectAreEntriesLoading } from "../features/entries"
import { selectAreSettingsLoading } from "../features/settings"

import { SEO, Loading } from "../features/app"

import { ProfileIndexPage, ProfileEditEmailPage } from "../features/profile"
import ProfileEditPasSwordPage from "../components/ProfileEditPasswordPage"

const ProfilePage = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const authIsPending = useSelector(selectAuthIsPending)
  const entriesAreLoading = useSelector(selectAreEntriesLoading)
  const settingsAreLoading = useSelector(selectAreSettingsLoading)

  const dataIsLoading = entriesAreLoading || settingsAreLoading

  useEffect(() => {
    if (!isAuthenticated && !authIsPending) {
      navigate("/login")
    }
  }, [isAuthenticated, authIsPending])

  if (!isAuthenticated || dataIsLoading) {
    return (
      <div>
        <SEO title="Loading..." />
        <Loading fullScreen />
      </div>
    )
  }

  return (
    <>
      <SEO title="Profile" />
      <Router basepath="/profile">
        <ProfileIndexPage path="/" />
        <ProfileEditEmailPage path="/edit" />
        <ProfileEditPasSwordPage path="/EditPasSwordPage" />
      </Router>
    </>
  )
}

export default ProfilePage
