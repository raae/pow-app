import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { Router } from "@reach/router"

import { selectAuthIsPending, selectIsAuthenticated } from "../auth/slice"
import { selectAreEntriesLoading } from "../entries/slice"
import { selectAreSettingsLoading } from "../settings/slice"

import SEO from "../app/Seo"
import Loading from "../app/Loading"

import ProfileIndexPage from "../profile/ProfileIndexPage"
import ProfileEditEmailPage from "../profile/ProfileEditEmailPage"
import { useSelector } from "react-redux"

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
