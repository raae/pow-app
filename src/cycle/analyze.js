import { map, compact, sum, round, last } from "lodash"

import { tagsFromText } from "../utils/tags"
import { daysBetweenDates, addDaysToDate } from "../utils/days"

export default ({ entries, settings }) => {
  // Sort entries by earliest first
  const sortedEntries = map(entries, (entry, key) => {
    const tags = tagsFromText(entry.note)
    const isMenstruation = tags.includes(settings.tag)
    return {
      date: key,
      tags,
      isMenstruation,
    }
  }).sort((a, b) => {
    return a.date < b.date ? -1 : 1
  })

  let cycleIndex = 0

  const cycle = {
    startDates: [],
    daysBetweens: [parseInt(settings.daysBetween, 10)],
    tags: {},
  }

  for (let entry of sortedEntries) {
    const lastStartDate = cycle.startDates[cycleIndex]
    let difference = daysBetweenDates(entry.date, lastStartDate)

    // This misses everything before start of first cycle

    if (entry.isMenstruation) {
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
  let daysBetween = sum(compactDaysBetweens) / compactDaysBetweens.length
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
    tag: settings.tag,
    daysBetween: round(daysBetween),
    nextStartDate,
    daysBetweenCalculated,
  }
}
