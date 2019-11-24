import React, { useEffect } from "react"
import { Element, scroller } from "react-scroll"
import { addDays, eachDayOfInterval, format } from "date-fns"

import Entry from "./Entry"

const keyFromDate = (date) => format(date, "yyyy-MM-dd")

const Entries = ({ scrollTimestamp }) => {
  const today = new Date()

  const range = eachDayOfInterval({
    start: addDays(today, -60),
    end: addDays(today, 60),
  })

  useEffect(() => {
    const yesterday = addDays(today, -1)
    scroller.scrollTo(keyFromDate(yesterday), { offset: -60 })
  }, [scrollTimestamp])

  return range.map((date) => {
    const key = keyFromDate(date)
    return (
      <Element key={key} name={key}>
        <Entry date={date}></Entry>
      </Element>
    )
  })
}

export default Entries
