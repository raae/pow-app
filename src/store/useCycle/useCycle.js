import { useEffect } from "react"
import {
  analyzeEntries,
  daysBetweenDates,
  addDaysToDate,
  formatDateToEntryKey,
} from "./utils"

import { useStore } from "../store"
import useEntries from "../useEntries"
import useSettings from "../useSettings"

const useCycle = () => {
  const [{ cycle }, setState] = useStore()
  const [{ entriesByDate }] = useEntries()
  const [{ menstruationSettings }] = useSettings()

  const updateCycle = (newCycle) => {
    setState((state) => ({
      ...state,
      cycle: {
        ...state.cycle,
        ...newCycle,
      },
    }))
  }

  const getCycleValue = (key) => {
    if (!cycle.hasOwnProperty(key)) {
      console.warn(`No ${key} on cycle slice of state`)
    }
    return cycle[key]
  }

  const getAverageLength = () => {
    return Math.floor(getCycleValue("averageLength"))
  }

  const getCurrentStartDate = () => {
    const startDates = getCycleValue("startDates")
    if (startDates.length > 0) {
      return startDates[startDates.length - 1]
    }
  }

  const getNextStartDate = () => {
    const currentStartDate = getCurrentStartDate()
    const averageLength = getAverageLength()
    if (averageLength && currentStartDate) {
      return addDaysToDate(currentStartDate, averageLength)
    }
  }

  const getDayInCycle = (date) => {
    if (!date) {
      date = formatDateToEntryKey(Date.now())
    }

    const currentStartDate = getCurrentStartDate()
    if (currentStartDate) {
      const difference = daysBetweenDates(date, currentStartDate)
      if (difference > -1) {
        return (difference % getAverageLength()) + 1
      }
    }
  }

  const getEntryKeyFromDate = (date) => {
    return formatDateToEntryKey(date)
  }

  const getTagsForCycleDay = (cycleDay) => {
    if (cycleDay > 0) {
      const tagsByCycleDay = getCycleValue("tags")
      const tags = tagsByCycleDay[cycleDay]
      if (tags) {
        return [...tags]
      } else {
        return []
      }
    }
  }

  useEffect(() => {
    const tag = menstruationSettings.tag
    const newCycle = analyzeEntries({ entriesByDate, tag })
    updateCycle(newCycle)
  }, [entriesByDate, menstruationSettings.tag])

  return [
    {
      startDates: getCycleValue("startDates"),
      currentStartDate: getCurrentStartDate(),
      nextStartDate: getNextStartDate(),
      averageLength: getAverageLength(),
    },
    {
      getDayInCycle,
      getTagsForCycleDay,
      getEntryKeyFromDate,
    },
  ]
}

export default useCycle
