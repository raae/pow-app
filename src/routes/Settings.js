import React from "react"

import { useSelector, useDispatch } from "react-redux"
import { selectUser, signOut } from "../store/auth"

import SEO from "../components/Seo"
import Settings from "../components/Settings"

import AppLayout from "../components/AppLayout"

const SettingsRoute = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const items = [
    {
      label: "Sign out",
      variant: "outlined",
      onClick: () => dispatch(signOut()),
    },
  ]

  return (
    <AppLayout appBarItems={items}>
      <SEO title="Settings" />
      <Settings user={user}></Settings>
    </AppLayout>
  )
}

export default SettingsRoute
