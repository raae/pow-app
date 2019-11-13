import React from "react"

import useBlockstack from "../store/useBlockstack"

import SEO from "../components/Seo"
import Settings from "../components/Settings"
import AppLayout from "../components/AppLayout"

const SettingsRoute = () => {
  const [{ user }, { signOut }] = useBlockstack()

  const items = [
    {
      label: "Sign out",
      variant: "outlined",
      onClick: signOut,
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
