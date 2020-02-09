import React, { useState } from "react"
import TodayIcon from "@material-ui/icons/Today"

import SEO from "../components/Seo"
import Entries from "../components/Entries"
import MenstruationNote from "../components/MenstruationNote"

import AppLayout from "../components/AppLayout"

const HomeRoute = () => {
  const [scrollTimestamp, setScrollTimestamp] = useState()

  const items = [
    {
      "aria-label": "Scroll to today",
      icon: <TodayIcon />,
      onClick: () => setScrollTimestamp(Date.now()),
    },
  ]

  const aside = <MenstruationNote />

  return (
    <AppLayout appBarItems={items} aside={aside}>
      <SEO title="Log" />
      <Entries scrollTimestamp={scrollTimestamp}></Entries>
    </AppLayout>
  )
}

export default HomeRoute
