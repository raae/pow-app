import React from "react"
import { navigate } from "gatsby"
import { Router } from "@reach/router"

import { useDataState } from "../database"

import SEO from "../components/Seo"
import Loading from "../components/Loading"

import BrandLayout from "../components/BrandLayout"
import { CycleProvider, useCycleDayState } from "../cycle"
import { useAuthState } from "../auth"
import { useEffect } from "react"
import { entryIdFromDate, makeDate, intervalAfterDate } from "../utils/days"
import DaySummary from "../components/DaySummary"
import Forecast from "../components/Forecast"
import DatePicker from "../components/DatePicker"

const Day = ({ date }) => {
  date = makeDate(date)
  const entryId = entryIdFromDate(date)

  const { daysBetween } = useCycleDayState({
    date: makeDate(entryId),
  })

  const afterInterval = intervalAfterDate(entryId, daysBetween + 3)

  return (
    <BrandLayout variant="app" toolbar={<DatePicker entryId={entryId} />}>
      <DaySummary entryId={entryId} />
      <Forecast entryId={entryId} interval={afterInterval} />
    </BrandLayout>
  )
}

const HomeRoute = () => {
  const { user, isPending: authIsPending } = useAuthState()
  const { isPending: dataIsPending, entries, settings } = useDataState()

  useEffect(() => {
    if (!user && !authIsPending) {
      navigate("/login")
    } else if (user) {
      const { protectedProfile } = user
      if (!protectedProfile || !protectedProfile.stripeCustomerId) {
        navigate("/payment?stripe=failed")
      }
    }
  }, [user, authIsPending])

  if (authIsPending || dataIsPending) {
    return <Loading fullScreen />
  }

  return (
    <CycleProvider entries={entries} settings={settings}>
      <SEO title="Log" />
      <Router basepath="/day">
        <Day path="/" />
        <Day path=":date" />
      </Router>
    </CycleProvider>
  )
}

export default HomeRoute
