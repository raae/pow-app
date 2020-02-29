import React, { useState } from "react"
import TodayIcon from "@material-ui/icons/Today"

import { useDataState } from "../database"

import SEO from "../components/Seo"
import Entries from "../components/Entries"
import MenstruationNote from "../components/MenstruationNote"
import Loading from "../components/Loading"

import AppLayout from "../components/AppLayout"
import { CycleProvider } from "../cycle"

const HomeRoute = () => {
  const [scrollTimestamp, setScrollTimestamp] = useState()
  const { isPending, entries, settings } = useDataState()

  const items = [
    {
      "aria-label": "Scroll to today",
      icon: <TodayIcon />,
      onClick: () => setScrollTimestamp(Date.now()),
    },
  ]

  if (isPending) {
    return <Loading />
  }

  return (
    <CycleProvider entries={entries} settings={settings}>
      <AppLayout appBarItems={items} aside={<MenstruationNote />}>
        <SEO title="Log" />
        <Entries scrollTimestamp={scrollTimestamp}></Entries>
      </AppLayout>
    </CycleProvider>
  )
}

export default HomeRoute
