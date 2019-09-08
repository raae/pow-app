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
      return daysBetweenDates(date, currentStartDate) + 1
    }
  }

  const getEntryKeyFromDate = (date) => {
    return formatDateToEntryKey(date)
  }

  const getCurrentCycleTags = (cycleDay) => {
    const tagsForCurrentCycle = getCycleValue("tagsForCurrentCycle")
    return tagsForCurrentCycle[cycleDay] || []
  }

  const getFutureCycleTags = (cycleDay) => {
    const averageLength = getAverageLength()
    if (cycleDay <= averageLength) return []
    const tagsForFutureCycles = getCycleValue("tagsForFutureCycles")
    return tagsForFutureCycles[cycleDay % averageLength] || []
  }

  const getTagsForCycleDay = (cycleDay) => {
    if (!cycleDay || cycleDay < 1) return

    const tagsForCurrentCycle = getCurrentCycleTags(cycleDay)
    const tagsForFutureCycles = getFutureCycleTags(cycleDay)
    const set = new Set(tagsForCurrentCycle.concat(tagsForFutureCycles))
    return [...set]
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
      menstruationTag: menstruationSettings.tag,
    },
    {
      getDayInCycle,
      getTagsForCycleDay,
      getEntryKeyFromDate,
    },
  ]
}

export default useCycle
