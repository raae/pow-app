import React from "react"
import { Link } from "gatsby"
import { addDays, eachDayOfInterval, format } from "date-fns"

import useBlockstack from "../store/useBlockstack"
import useEntries from "../store/useEntries"

import TestTemplate from "../templates/test"
import Entry from "../components/Entry"

const AppPage = () => {
  const [{ isPending }] = useBlockstack()
  const [{ entriesByDate = {} }, { changeEntry }] = useEntries()
  const today = new Date()
  const entries = eachDayOfInterval({
    start: addDays(today, -1),
    end: addDays(today, 30),
  }).map((date) => {
    const dateString = format(date, "yyyy-MM-dd")
    const entry = entriesByDate[dateString] || {}
    const predictions = [
      "exhausted",
      "happy",
      "period",
      "headache",
      "heavyflow",
      "angry",
      "PMS",
    ]

    return {
      date: dateString,
      note: entry.note,
      tags: entry.tags ? entry.tags : [],
      predictions: predictions.map((prediction) => {
        return {
          label: prediction,
          confidence: Math.random() + 0.3,
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
    <TestTemplate navItems={navItems}>
      {entries.map((entry) => {
        return (
          <Entry
            key={entry.date}
            entry={entry}
            handleEntryChange={changeEntry}
          ></Entry>
        )
      })}
    </TestTemplate>
  )
}

export default AppPage
