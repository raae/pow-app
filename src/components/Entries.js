import React, { useEffect } from "react"
import { Element, scroller } from "react-scroll"
import { addDays, eachDayOfInterval } from "date-fns"

import useEntries from "../store/useEntries"
import useCycle from "../store/useCycle"

import Entry from "./Entry"

const Entries = ({ scrollTimestamp }) => {
  const [{ entriesByDate }, { changeEntry }] = useEntries()
  const [
    { menstruationTag },
    { getDayInCycle, getTagsForCycleDay, getEntryKeyFromDate },
  ] = useCycle()

  const today = new Date()

  const range = eachDayOfInterval({
    start: addDays(today, -60),
    end: addDays(today, 60),
  }).map((date) => {
    const entryKey = getEntryKeyFromDate(date)
    const entry = entriesByDate[entryKey] || {}
    const dayInCycle = getDayInCycle(entryKey)
    const predictions = getTagsForCycleDay(dayInCycle)
    let hasMenstruationTag = false

    if (entry.tags) {
      hasMenstruationTag =
        hasMenstruationTag || entry.tags.includes(menstruationTag)
    }
    if (predictions) {
      hasMenstruationTag =
        hasMenstruationTag || predictions.includes(menstruationTag)
    }

    return {
      entry: {
        ...entry,
        date: entryKey,
      },
      predictions,
      isMenstruation: hasMenstruationTag,
    }
  })

  useEffect(() => {
    const yesterday = addDays(today, -1)
    scroller.scrollTo(getEntryKeyFromDate(yesterday), { offset: -60 })
  }, [scrollTimestamp])

  return range.map(({ entry, predictions, isMenstruation }) => {
    return (
      <Element key={entry.date} name={entry.date}>
        <Entry
          entry={entry}
          predictions={predictions}
          isMenstruation={isMenstruation}
          onEntryChange={changeEntry}
        ></Entry>
      </Element>
    )
  })
}

export default Entries
