import React from "react"
import { Link } from "gatsby"

import AppTemplate from "../templates/app"
import useBlockstack from "../hooks/useBlockstack"
import Log from "./../components/Log"
import useStorage from "../hooks/useStorage"

const AppPage = () => {
  const { isPending, putJson, getJson, isAuthenticated } = useBlockstack()
  const [
    { entries, isInitializing, isUpdating },
    { addEntry, deleteEntries },
  ] = useStorage({
    isAuthenticated,
    putJson,
    getJson,
  })

  const navItems = [
    {
      label: "Profile",
      disabled: isPending,
      variant: "outlined",
      component: Link,
      to: "/profile",
    },
  ]

  return (
    <AppTemplate navItems={navItems}>
      <Log
        handleSubmitEntry={addEntry}
        handleDeleteAll={deleteEntries}
        entries={entries}
        isProcessing={isInitializing || isUpdating}
      ></Log>
    </AppTemplate>
  )
}

export default AppPage
