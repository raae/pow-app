import { useEffect } from "react"
import { analyzeEntries, daysBetweenDates, addDaysToDate } from "./utils"

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

  const getCurrentStartDate = () => {
    const startDates = getCycleValue("startDates")
    if (startDates.length > 0) {
      return startDates[startDates.length - 1]
    }
  }

  const getNextStartDate = () => {
    const currentStartDate = getCurrentStartDate()
    const averageLength = getCycleValue("averageLength")
    if (averageLength && currentStartDate) {
      return addDaysToDate(currentStartDate, averageLength)
    }
  }

  const getCurrentDayInCycle = (date) => {
    const currentStartDate = getCurrentStartDate()
    if (currentStartDate) {
      return daysBetweenDates(date, currentStartDate) + 1
    }
  }

  useEffect(() => {
    const tag = menstruationSettings.tag
    const averageLength = cycle.averageLength
    const newCycle = analyzeEntries({ entriesByDate, tag, averageLength })
    updateCycle(newCycle)
    console.log(newCycle)
  }, [entriesByDate, menstruationSettings.tag])

  return [
    {
      startDates: getCycleValue("startDates"),
      currentStartDate: getCurrentStartDate(),
      nextStartDate: getNextStartDate(),
      averageLength: getCycleValue("averageLength"),
      tags: getCycleValue("tags"),
    },
    {
      getCurrentDayInCycle,
    },
  ]
}

export default useCycle
