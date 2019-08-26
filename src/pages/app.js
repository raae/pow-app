import React, { useState } from "react"
import useEntries from "../store/useEntries"

import AppTemplate from "../templates/app"
import Entries from "../components/Entries"
import navItem from "../components/navItem"
import Loading from "../components/Loading"

const AppPage = () => {
  const [{ entriesByDate, isFetched }, { changeEntry }] = useEntries()
  const [scrollTimestamp, setScrollTimestamp] = useState()

  const appBarItems = [
    {
      ...navItem("today"),
      onClick: () => setScrollTimestamp(Date.now()),
    },
  ]

  return (
    <AppTemplate appBarItems={appBarItems}>
      {isFetched ? (
        <Entries
          entriesByDate={entriesByDate}
          onEntryChange={changeEntry}
          scrollTimestamp={scrollTimestamp}
        ></Entries>
      ) : (
        <Loading></Loading>
      )}
    </AppTemplate>
  )
}

export default AppPage
