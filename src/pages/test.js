import React from "react"
import { addDays, eachDayOfInterval, format } from "date-fns"

import useEntries from "../store/useEntries"

import TestTemplate from "../templates/test"
import Entry from "../components/Entry"

const TestPage = () => {
  const [{ entriesByDate = {} }, { changeEntry }] = useEntries()
  const today = new Date()
  const range = eachDayOfInterval({
    start: addDays(today, -1),
    end: addDays(today, 30),
  }).map((date) => {
    const dateString = format(date, "yyyy-MM-dd")
    const entry = entriesByDate[dateString] || {}
    const predictions = [
      "exhausted",
      "happy",
      "hodepine",
      "heavy flow",
      "SINNA",
      "PMS",
      "sexytime",
      "verk i livmor",
    ]

    return {
      entry: {
        ...entry,
        date: dateString,
      },
      predictions: predictions
        .slice(Math.random() * 7, Math.random() * -7)
        .map((prediction) => {
          return {
            label: prediction,
            confidence: Math.random() + 0.3,
          }
        }),
    }
  })

  const navItems = []

  return (
    <TestTemplate navItems={navItems}>
      {range.map(({ entry, predictions }) => {
        return (
          <Entry
            key={entry.date}
            entry={entry}
            predictions={predictions}
            handleEntryChange={changeEntry}
          ></Entry>
        )
      })}
    </TestTemplate>
  )
}

export default TestPage
