import { values, mergeWith, sumBy, isArray, map } from "lodash"
import { differenceInDays } from "date-fns"

const mergeCycleTags = (cycles) => {
  const customizer = (objValue, srcValue) => {
    if (isArray(objValue)) {
      return objValue.concat(srcValue)
    }
  }

  return mergeWith({}, ...map(cycles, "tags"), customizer)
}

export const daysBetweenDates = (dateA, dateB) => {
  if (!(dateA instanceof Date)) {
    dateA = new Date(dateA)
  }
  if (!(dateB instanceof Date)) {
    dateB = new Date(dateB)
  }

  if (isNaN(dateA.valueOf()) || isNaN(dateB.valueOf())) return -1

  return differenceInDays(dateA, dateB)
}

const entryHasTag = (entry, tag) => {
  return entry.tags.includes(tag)
}

export default ({ entriesByDate, menstruationTag }) => {
  // Sort entries by earliest first
  const sortedEntries = values(entriesByDate).sort((a, b) =>
    a.date < b.date ? -1 : 1
  )

  const cycles = []
  let cycleIndex = 0

  for (let entry of sortedEntries) {
    const { startDate: lastStartDate } = cycles[cycleIndex] || {}
    let difference = daysBetweenDates(entry.date, lastStartDate)

    // This misses everything before start of first cycle

    if (entryHasTag(entry, menstruationTag)) {
      if (difference > 14) {
        // Entry is start of new cycle
        cycles[cycleIndex].length = difference
        cycleIndex++
        cycles[cycleIndex] = {
          startDate: entry.date,
          tags: {},
        }
        difference = 0
      } else if (difference === -1) {
        // Entry is start of first cycle
        cycles[cycleIndex] = {
          startDate: entry.date,
          tags: {},
        }
        difference = 0
      }
    }

    if (difference > -1 && entry.tags.length > 0) {
      const cycleDay = difference
      cycles[cycleIndex].tags[cycleDay] = entry.tags
    }
  }

  let averageCycleLength = undefined
  let tagsForCurrentCycle = {}
  let tagsForFutureCycles = {}
  let currentCycleStartDate = undefined

  if (cycles.length > 0) {
    // We have at least the start of a cycle
    currentCycleStartDate = cycles[cycles.length - 1].startDate
  }

  if (cycles.length > 1) {
    // We have at least one full cycle
    averageCycleLength = sumBy(cycles, "length") / (cycles.length - 1)
    // Do not use latest cycle data for predictions
    tagsForCurrentCycle = mergeCycleTags(cycles.slice(0, cycles.length - 1))
  }

  tagsForFutureCycles = mergeCycleTags(cycles)

  return {
    currentCycleStartDate,
    averageCycleLength,
    tagsForFutureCycles,
    tagsForCurrentCycle,
  }
}
