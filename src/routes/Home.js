import React, { useState } from "react"
import TodayIcon from "@material-ui/icons/Today"

import { useSelector } from "react-redux"
import { selectUser } from "../store/auth"
import { selectDataIsInitialized } from "../store/data"
import { selectCalculationIsInitialized } from "../store/cycle"

import SEO from "../components/Seo"
import Entries from "../components/Entries"
import Loading from "../components/Loading"
import MenstruationNote from "../components/MenstruationNote"

import AppLayout from "../components/AppLayout"

const HomeRoute = () => {
  const isDataInitialized = useSelector(selectDataIsInitialized)
  const isCalculationInitialized = useSelector(selectCalculationIsInitialized)
  const [scrollTimestamp, setScrollTimestamp] = useState()

  const items = [
    {
      "aria-label": "Scroll to today",
      icon: <TodayIcon />,
      onClick: () => setScrollTimestamp(Date.now()),
    },
  ]

  const aside = isCalculationInitialized && <MenstruationNote />

  return (
    <AppLayout appBarItems={items} aside={aside}>
      <SEO title="Log" />
      {isDataInitialized ? (
        <Entries scrollTimestamp={scrollTimestamp}></Entries>
      ) : (
        <Loading></Loading>
      )}
    </AppLayout>
  )
}

export default HomeRoute
