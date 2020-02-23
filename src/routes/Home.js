import React, { useState } from "react"
import TodayIcon from "@material-ui/icons/Today"

import { useDataState } from "../database"

import SEO from "../components/Seo"
import Entries from "../components/Entries"
import MenstruationNote from "../components/MenstruationNote"
import Loading from "../components/Loading"

import AppLayout from "../components/AppLayout"

const HomeRoute = () => {
  const [scrollTimestamp, setScrollTimestamp] = useState()
  const { entries } = useDataState()

  const items = [
    {
      "aria-label": "Scroll to today",
      icon: <TodayIcon />,
      onClick: () => setScrollTimestamp(Date.now()),
    },
  ]

  const aside = <MenstruationNote />

  if (entries.isPending) {
    return <Loading />
  }

  return (
    <AppLayout appBarItems={items} aside={aside}>
      <SEO title="Log" />
      <Entries scrollTimestamp={scrollTimestamp}></Entries>
    </AppLayout>
  )
}

export default HomeRoute
