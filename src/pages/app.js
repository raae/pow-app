import React from "react"
import { Link } from "gatsby"
import { addDays, eachDayOfInterval, format } from "date-fns"

import useBlockstack from "../store/useBlockstack"
import useEntries from "../store/useEntries"

import AppTemplate from "../templates/app"
import EntryList from "../components/EntryList"

const AppPage = () => {
  const [{ isPending }] = useBlockstack()
  const [{ entriesByDate = {} }, { changeEntry }] = useEntries()
  const today = new Date()
  const entries = eachDayOfInterval({
    start: addDays(today, -30),
    end: addDays(today, 30),
  }).map((date) => {
    const dateString = format(date, "yyyy-MM-dd")
    const entry = entriesByDate[dateString] || {}
    console.log(dateString, entry)
    const predictions = [
      { label: "exhausted", confidence: 0.5 },
      { label: "happy", confidence: 0.7 },
      { label: "period", confidence: 0.3 },
      { label: "headache", confidence: 0.5 },
    ].slice(0, Math.round(Math.random() * 4))

    entry.tags = Math.random() > 0.5 ? ["exhausted"] : []

    return {
      date: dateString,
      note: entry.note,
      tags: predictions.map((prediction) => {
        return {
          ...prediction,
          selected: entry.tags.includes(prediction.label),
        }
      }),
    }
  })

  const navItems = [
    {
      label: "Profile",
      disabled: isPending,
      variant: "outlined",
      component: Link,
      to: "/profile",
    },
  ]

  return (
    <AppTemplate navItems={navItems}>
      <EntryList entries={entries}></EntryList>
    </AppTemplate>
  )
}

export default AppPage
