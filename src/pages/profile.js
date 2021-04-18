import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { navigate } from "gatsby"
import { Router } from "@reach/router"

import { useAuth } from "../features/auth"
import { selectAreEntriesLoading } from "../features/entries"
import { selectAreSettingsLoading } from "../features/settings"

import { SEO, Loading } from "../features/app"

import {
  ProfileIndexPage,
  ProfileEditEmailPage,
  ProfileEditPasswordPage,
} from "../features/profile"

const ProfilePage = () => {
  const { isAuthenticated, isUnauthenticated, isAuthPending } = useAuth()

  const entriesAreLoading = useSelector(selectAreEntriesLoading)
  const settingsAreLoading = useSelector(selectAreSettingsLoading)

  const dataIsLoading = entriesAreLoading || settingsAreLoading

  useEffect(() => {
    if (isUnauthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, isAuthPending])

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
        <ProfileEditPasswordPage path="/password" />
      </Router>
    </>
  )
}

export default ProfilePage
