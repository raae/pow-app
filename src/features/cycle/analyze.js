import { compact, sum, round, last } from "lodash"

import { daysBetweenDates, addDaysToDate } from "../utils/days"

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

  const compactDaysBetweens = compact(cycle.daysBetweens)
  let daysBetween = round(sum(compactDaysBetweens) / compactDaysBetweens.length)
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
