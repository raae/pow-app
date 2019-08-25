import React, { useEffect } from "react"
import { Element, scroller } from "react-scroll"
import { addDays, eachDayOfInterval, format } from "date-fns"

import Entry from "./Entry"

const Entries = ({ entriesByDate = {}, onEntryChange, scrollTimestamp }) => {
  const today = new Date()

  const range = eachDayOfInterval({
    start: addDays(today, -60),
    end: addDays(today, 60),
  }).map((date) => {
    const dateString = format(date, "yyyy-MM-dd")
    const entry = entriesByDate[dateString] || {}

    return {
      entry: {
        ...entry,
        date: dateString,
      },
      predictions: [], // Need to add logic
    }
  })

  useEffect(() => {
    const yesterday = addDays(today, -1)
    scroller.scrollTo(format(yesterday, "yyyy-MM-dd"), { offset: -60 })
  }, [scrollTimestamp])

  return range.map(({ entry, predictions }) => {
    return (
      <Element key={entry.date} name={entry.date}>
        <Entry
          entry={entry}
          predictions={predictions}
          onEntryChange={onEntryChange}
        ></Entry>
      </Element>
    )
  })
}

export default Entries
