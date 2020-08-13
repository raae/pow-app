import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { navigate } from "gatsby"
import { Router } from "@reach/router"

import { selectAuthIsPending, selectIsAuthenticated } from "../features/auth"
import { selectAreEntriesLoading } from "../features/entries/slice"
import { selectAreSettingsLoading } from "../features/settings/slice"

import { SEO, Loading } from "../features/app"

import ProfileIndexPage from "../features/profile/ProfileIndexPage"
import ProfileEditEmailPage from "../features/profile/ProfileEditEmailPage"

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
      </Router>
    </>
  )
}

export default ProfilePage
