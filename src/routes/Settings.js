import React from "react"
import { navigate } from "gatsby"

import { useAuthActions, useAuthState } from "../auth"
import { useDataState } from "../database"

import SEO from "../components/Seo"
import Settings from "../components/Settings"

import AppLayout from "../components/AppLayout"
import Loading from "../components/Loading"

const SettingsRoute = () => {
  const { user } = useAuthState()
  const { signOut } = useAuthActions()
  const { isPending, cycle } = useDataState()

  const items = [
    {
      label: "Sign out",
      variant: "outlined",
      onClick: async () => {
        const result = await signOut()
        if (!result.error) {
          navigate("/")
        }
      },
    },
  ]

  if (isPending) {
    return <Loading />
  }

  return (
    <AppLayout appBarItems={items}>
      <SEO title="Settings" />
      <Settings user={user} cycle={cycle}></Settings>
    </AppLayout>
  )
}

export default SettingsRoute
