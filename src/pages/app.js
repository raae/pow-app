import React, { useState } from "react"

import useEntries from "../store/useEntries"
import useStatus from "../store/useStatus"
import useSettings from "../store/useSettings"

import AppTemplate from "../templates/app"
import Entries from "../components/Entries"
import navItem from "../components/navItem"
import Loading from "../components/Loading"
import MenstruationNote from "../components/MenstruationNote"

const AppPage = () => {
  const [{ isInitialized }] = useStatus()
  const [{ entriesByDate }, { changeEntry }] = useEntries()
  const [{ menstruationSettings }] = useSettings()
  const [scrollTimestamp, setScrollTimestamp] = useState()

  const appBarItems = [
    {
      ...navItem("today"),
      onClick: () => setScrollTimestamp(Date.now()),
    },
  ]

  const aside = isInitialized && (
    <MenstruationNote menstruationSettings={menstruationSettings} />
  )

  return (
    <AppTemplate appBarItems={appBarItems} aside={aside}>
      {isInitialized ? (
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
