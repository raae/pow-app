import React from "react"

import useBlockstack from "../store/useBlockstack"

import AppTemplate from "../templates/app"
import SEO from "../components/Seo"
import Settings from "../components/Settings"

const SettingsPage = () => {
  const [{ user }, { signOut }] = useBlockstack()

  const appBarItems = [
    {
      label: "Sign out",
      variant: "outlined",
      onClick: signOut,
    },
  ]

  return (
    <>
      <SEO title="Settings" />
      <AppTemplate appBarItems={appBarItems}>
        <Settings user={user}></Settings>
      </AppTemplate>
    </>
  )
}

export default SettingsPage
