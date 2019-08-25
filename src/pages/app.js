import React, { useState } from "react"
import useBlockstack from "../store/useBlockstack"
import useEntries from "../store/useEntries"

import AppTemplate from "../templates/app"
import Entries from "../components/Entries"
import navItem from "../components/navItem"

const AppPage = () => {
  const [{ isPending }] = useBlockstack()
  const [{ entriesByDate, isFetched }, { changeEntry }] = useEntries()
  const [scrollTimestamp, setScrollTimestamp] = useState()

  const navItems = [
    {
      ...navItem("profile"),
      disabled: isPending,
    },
    {
      ...navItem("today"),
      onClick: () => setScrollTimestamp(Date.now()),
    },
  ]

  return (
    <AppTemplate navItems={navItems}>
      {isFetched ? (
        <Entries
          entriesByDate={entriesByDate}
          onEntryChange={changeEntry}
          scrollTimestamp={scrollTimestamp}
        ></Entries>
      ) : (
        "LOADING"
      )}
    </AppTemplate>
  )
}

export default AppPage
