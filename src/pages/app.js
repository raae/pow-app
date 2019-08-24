import React from "react"
import { Link } from "gatsby"

import useBlockstack from "../store/useBlockstack"
import useEntries from "../store/useEntries"

import AppTemplate from "../templates/app"
import EntryList from "../components/EntryList"

const AppPage = () => {
  const [{ isPending }] = useBlockstack()
  const [{ entries, entriesByDate }, { changeEntry }] = useEntries()

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
      <EntryList entries={entries}></EntryList>
    </AppTemplate>
  )
}

export default AppPage
