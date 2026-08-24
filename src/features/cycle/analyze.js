import { compact, round, last, sum, takeRight } from "lodash"

import { daysBetweenDates, addDaysToDate } from "../utils/days"

// Predictions use only the most recent cycles, so older cycles age
// out as new ones are logged. With enough of them the shortest and
// longest are dropped and the rest averaged; with fewer, the median
// is used, as dropping values from a small sample lets an extreme
// value back in. Either way a one-off long gap (pregnancy, a break
// from logging) does not skew the prediction.
const RECENT_CYCLES_COUNT = 6
const TRIMMED_MEAN_MIN_COUNT = 5

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b)
  const middle = (sorted.length - 1) / 2
  return (sorted[Math.floor(middle)] + sorted[Math.ceil(middle)]) / 2
}

const trimmedMean = (values) => {
  const sorted = [...values].sort((a, b) => a - b)
  const trimmed = sorted.slice(1, -1)
  return sum(trimmed) / trimmed.length
}

const typicalValue = (values) => {
  if (values.length >= TRIMMED_MEAN_MIN_COUNT) return trimmedMean(values)
  return median(values)
}

const analyze = ({ sortedEntries, initialDaysBetween }) => {
  let cycleIndex = 0

  const cycle = {
    startDates: [],
    daysBetweens: [initialDaysBetween],
    tags: {},
  }

  for (let entry of sortedEntries) {
    const lastStartDate = cycle.startDates[cycleIndex]
    let difference = daysBetweenDates(entry.date, lastStartDate)

    if (entry.isMenses) {
      if (difference > 14) {
        // Entry is start of new cycle
        cycleIndex++
        cycle.startDates[cycleIndex] = entry.date
        cycle.daysBetweens[cycleIndex] = difference
        difference = 0
      } else if (difference === -1) {
        // Entry is start of first cycle
        cycle.startDates[cycleIndex] = entry.date
        difference = 0
      }
    }

    if (difference > -1) {
      const cycleDay = difference
      if (cycle.tags[cycleDay]) {
        cycle.tags[cycleDay] = [...cycle.tags[cycleDay], ...entry.tags]
      } else {
        cycle.tags[cycleDay] = [...entry.tags]
      }
    }
  }

  const knownDaysBetweens = compact(cycle.daysBetweens)
  const recentDaysBetweens = takeRight(knownDaysBetweens, RECENT_CYCLES_COUNT)
  let daysBetween = round(typicalValue(recentDaysBetweens))
  let daysBetweenCalculated = true
  if (!daysBetween) {
    daysBetween = 28
    daysBetweenCalculated = false
  }

  let nextStartDate = undefined
  const currentStartDate = last(cycle.startDates)
  if (currentStartDate && daysBetween) {
    nextStartDate = addDaysToDate(currentStartDate, daysBetween)
  }

  return {
    ...cycle,
    daysBetween: daysBetween,
    isDaysBetweenCalculated: daysBetweenCalculated,
    nextStartDate,
  }
}

export default analyze
