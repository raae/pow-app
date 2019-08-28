import React from "react"

import useBlockstack from "../store/useBlockstack"
import useSettings from "../store/useSettings"

import AppTemplate from "../templates/app"
import Settings from "../components/Settings"

const SettingsPage = () => {
  const [{ user }, { signOut }] = useBlockstack()
  const [{ menstruationSettings }, { setMenstruationSettings }] = useSettings()

  const appBarItems = [
    {
      label: "Sign out",
      variant: "outlined",
      onClick: signOut,
    },
  ]

  return (
    <AppTemplate appBarItems={appBarItems}>
      <Settings
        user={user}
        menstruationSettings={menstruationSettings}
        onMenstruationSettingsChange={setMenstruationSettings}
      ></Settings>
    </AppTemplate>
  )
}

export default SettingsPage
