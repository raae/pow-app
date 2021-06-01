import { useEffect } from "react"
import { entryIdFromDate, makeDate } from "../utils/days"

export const useScrollToDate = (entryId) => {
  const selectedDate = makeDate(entryId)
  useEffect(() => {
    const scrollToId = `scrollTo-${entryIdFromDate(selectedDate)}`
    const node = document.getElementById(scrollToId)
    if (!node) return

    node.scrollIntoView({
      block: "start",
    })
  }, [selectedDate])

  return selectedDate
}
