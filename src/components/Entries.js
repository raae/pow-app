import React, { useEffect } from "react"
import { Element, scroller } from "react-scroll"
import { addDays, eachDayOfInterval, format } from "date-fns"

import { useDataState } from "../database"

import Entry from "./Entry"

const keyFromDate = (date) => format(date, "yyyy-MM-dd")

const Entries = ({ scrollTimestamp }) => {
  const today = new Date()
  const { entries } = useDataState()

  const range = eachDayOfInterval({
    start: addDays(today, -60),
    end: addDays(today, 60),
  })

  useEffect(() => {
    const yesterday = addDays(today, -1)
    scroller.scrollTo(keyFromDate(yesterday), { offset: -60 })
  }, [scrollTimestamp, today])

  return range.map((date) => {
    const key = keyFromDate(date)
    const entry = entries[key]
    return (
      <Element key={key} name={key}>
        <Entry date={date} entryId={key} entry={entry}></Entry>
      </Element>
    )
  })
}

export default Entries
