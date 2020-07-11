import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { Router } from "@reach/router"

import { useDataState } from "../database"
import { CycleProvider } from "../cycle"

import SEO from "../components/Seo"
import Loading from "../components/Loading"

import ProfileIndexPage from "../components/ProfileIndexPage"
import ProfileEditEmailPage from "../components/ProfileEditEmailPage"
import { useSelector } from "react-redux"
import { selectAuthUser, selectAuthIsPending } from "../auth/slice"

const ProfilePage = () => {
  const user = useSelector(selectAuthUser)
  const authIsPending = useSelector(selectAuthIsPending)
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
        <ProfileEditEmailPage path="/edit" />
      </Router>
    </CycleProvider>
  )
}

export default ProfilePage
