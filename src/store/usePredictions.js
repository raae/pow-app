import { useEffect } from "react"
import { differenceInDays, addDays, format } from "date-fns"
import { values, sum } from "lodash"

import { useStore } from "./store"
import useEntries from "./useEntries"
import useSettings from "./useSettings"

const usePredictions = () => {
  const [{ predictions }, setState] = useStore()
  const [{ entriesByDate }] = useEntries()
  const [{ menstruationSettings }] = useSettings()

  const updatePrediction = (key, prediction) => {
    setState((state) => ({
      ...state,
      predictions: {
        ...state.predictions,
        [key]: prediction,
      },
    }))
  }

  const getPrediction = (key) => {
    if (!predictions.hasOwnProperty(key)) {
      console.warn(`No ${key} on settings slice of state`)
    }
    return predictions[key]
  }

  const setCurrentCycleStart = (date) => {
    updatePrediction("currentCycleStart", date)
  }

  const setAverageCycle = (length) => {
    updatePrediction("averageCycle", length)
  }

  const getCurrentCycleDay = () => {
    const currentCycleStart = getPrediction("currentCycleStart")

    if (currentCycleStart) {
      const currentCycleStart = new Date(getPrediction("currentCycleStart"))
      return differenceInDays(Date.now(), new Date(currentCycleStart)) + 1
    }
  }

  const getNextMenstruation = () => {
    const currentCycleStart = new Date(getPrediction("currentCycleStart"))
    const averageCycle = getPrediction("averageCycle")
    const cycleLength = averageCycle
      ? averageCycle
      : getPrediction("defaultCycle")

    return addDays(currentCycleStart, cycleLength)
  }

  useEffect(() => {
    const tag = menstruationSettings.tag
    const entries = values(entriesByDate)

    const cycleStartEntries = entries
      .filter((entry) => {
        if (entry.tags.includes(tag)) {
          // Finding entries with menstruation tag,
          // not preceded by a menstruation tag day.
          const date = new Date(entry.date)
          const yesterday = addDays(date, -1)
          const yesterdayDateString = format(yesterday, "yyyy-MM-dd")
          const yesterdayEntry = entriesByDate[yesterdayDateString]
          if (!yesterdayEntry) {
            return true
          } else {
            return !yesterdayEntry.tags.includes(tag)
          }
        }
      })
      .sort((a, b) => (a.date > b.date ? -1 : 1))
      .map((entry) => entry.date)

    setCurrentCycleStart(cycleStartEntries[0])

    if (cycleStartEntries.length > 1) {
      const cycleLengths = cycleStartEntries.map((date, index, array) => {
        if (index > 0) {
          return differenceInDays(new Date(array[index - 1]), new Date(date))
        } else {
          return 0
        }
      })

      const averageCycleLength = sum(cycleLengths) / (cycleLengths.length - 1)
      setAverageCycle(averageCycleLength)
    } else {
      setAverageCycle(null)
    }
  }, [entriesByDate, menstruationSettings.tag])

  return [
    {
      currentCycleDay: getCurrentCycleDay(),
      nextMenstruation: getNextMenstruation(),
    },
    {},
  ]
}

export default usePredictions
