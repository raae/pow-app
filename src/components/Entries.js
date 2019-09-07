import React, { useEffect } from "react"
import { Element, scroller } from "react-scroll"
import { addDays, eachDayOfInterval, format } from "date-fns"

import useEntries from "../store/useEntries"
import useCycle from "../store/useCycle"

import Entry from "./Entry"

const Entries = ({ scrollTimestamp }) => {
  const [{ entriesByDate }, { changeEntry }] = useEntries()
  const [_, { getDayInCycle, getTagsForCycleDay }] = useCycle()

  const today = new Date()

  const range = eachDayOfInterval({
    start: addDays(today, -60),
    end: addDays(today, 60),
  }).map((date) => {
    const dateString = format(date, "yyyy-MM-dd")
    const entry = entriesByDate[dateString] || {}
    const dayInCycle = getDayInCycle(dateString)

    return {
      entry: {
        ...entry,
        date: dateString,
        dayInCycle,
      },
      predictions: getTagsForCycleDay(dayInCycle),
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
          onEntryChange={changeEntry}
        ></Entry>
      </Element>
    )
  })
}

export default Entries
