import { last, mean, round, sortBy, takeRight } from "lodash"

import { daysBetweenDates, addDaysToDate } from "../utils/days"
import { CYCLE_LENGTH_MIN_MAX, DEFAULT_CYCLE_LENGTH } from "./constants"

// Predictions use only the most recent cycles, so older cycles age
// out as new ones are logged. A gap longer than the max cycle length
// is a break in tracking (pregnancy, time away from the app), not a
// cycle, and is left out of the prediction entirely. Of the cycles
// that remain, with enough of them the shortest and longest are
// dropped and the rest averaged; with fewer, the median is used, as
// dropping values from a small sample lets an extreme value back in.
// These are prediction tuning, not part of what defines a cycle, and
// the trimmed mean needs TRIMMED_MEAN_MIN_COUNT of the (at most)
// RECENT_CYCLES_COUNT values to ever run.
const RECENT_CYCLES_COUNT = 6
const TRIMMED_MEAN_MIN_COUNT = 5

const statistics = (values) => {
  const sorted = sortBy(values)
  const middle = (sorted.length - 1) / 2

  return {
    count: sorted.length,
    median: (sorted[Math.floor(middle)] + sorted[Math.ceil(middle)]) / 2,
    trimmedMean: mean(sorted.slice(1, -1)),
  }
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
      if (difference > CYCLE_LENGTH_MIN_MAX.min) {
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

    // Tags are collected even for days in a break in tracking; only
    // the cycle length below leaves breaks out, see issue #339
    if (difference > -1) {
      const cycleDay = difference
      if (cycle.tags[cycleDay]) {
        cycle.tags[cycleDay] = [...cycle.tags[cycleDay], ...entry.tags]
      } else {
        cycle.tags[cycleDay] = [...entry.tags]
      }
    }
  }

  const recentDaysBetweens = takeRight(
    cycle.daysBetweens.filter(
      (days) =>
        days >= CYCLE_LENGTH_MIN_MAX.min && days <= CYCLE_LENGTH_MIN_MAX.max
    ),
    RECENT_CYCLES_COUNT
  )
  const { count, median, trimmedMean } = statistics(recentDaysBetweens)
  let daysBetween = round(
    count >= TRIMMED_MEAN_MIN_COUNT ? trimmedMean : median
  )
  let daysBetweenCalculated = true
  if (!daysBetween) {
    daysBetween = DEFAULT_CYCLE_LENGTH
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
