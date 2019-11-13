import React, { useState } from "react"

import useStatus from "../store/useStatus"

import SEO from "../components/Seo"
import Entries from "../components/Entries"
import Loading from "../components/Loading"
import MenstruationNote from "../components/MenstruationNote"

import TodayIcon from "@material-ui/icons/Today"
import AppLayout from "../components/AppLayout"

const HomeRoute = () => {
  const [{ isInitialized }] = useStatus()
  const [scrollTimestamp, setScrollTimestamp] = useState()

  const items = [
    {
      "aria-label": "Scroll to today",
      icon: <TodayIcon />,
      onClick: () => setScrollTimestamp(Date.now()),
    },
  ]

  const aside = isInitialized && <MenstruationNote />

  return (
    <AppLayout appBarItems={items} aside={aside}>
      <SEO title="Log" />
      {isInitialized ? (
        <Entries scrollTimestamp={scrollTimestamp}></Entries>
      ) : (
        <Loading></Loading>
      )}
    </AppLayout>
  )
}

export default HomeRoute
