import React from "react"
import { Link } from "gatsby"

import useBlockstack from "../hooks/useBlockstack"
import useEntries from "../store/useEntries"

import AppTemplate from "../templates/app"
import EntryForm from "../components/EntryForm"
import EntryList from "../components/EntryList"

const AppPage = () => {
  const { isPending } = useBlockstack()
  const [{ entries }, { addEntry }] = useEntries()

  const navItems = [
    {
      label: "Profile",
      disabled: isPending,
      variant: "outlined",
      component: Link,
      to: "/profile",
    },
  ]

  console.log("Entries", entries)

  return (
    <AppTemplate navItems={navItems}>
      <EntryForm handleSubmitEntry={addEntry}></EntryForm>
      <EntryList entries={entries}></EntryList>
    </AppTemplate>
  )
}

export default AppPage
