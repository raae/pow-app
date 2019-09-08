import { values, sum, merge } from "lodash"
import { differenceInDays, addDays, format } from "date-fns"

const getLastInArray = (array) => {
  const index = array.length > 0 ? array.length - 1 : 0
  return array[index]
}

export const formatDateToEntryKey = (date) => {
  return format(date, "yyyy-MM-dd")
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

export const addDaysToDate = (date, days) => {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }

  if (isNaN(date.valueOf())) return

  const newDate = addDays(date, days)
  return format(newDate, "yyyy-MM-dd")
}

const entryHasTag = (entry, tag) => {
  return entry.tags.includes(tag)
}

export const analyzeEntries = ({ entriesByDate, tag }) => {
  // Sort entries by earliest first
  const sortedEntries = values(entriesByDate).sort((a, b) =>
    a.date < b.date ? -1 : 1
  )

  const startDates = []
  const cycleLengths = []
  const cycleTags = []
  let averageLength = undefined
  let tags = {}

  for (let entry of sortedEntries) {
    const lastStartDate = getLastInArray(startDates)
    let difference = daysBetweenDates(entry.date, lastStartDate)

    if (entryHasTag(entry, tag)) {
      if (difference >= 14) {
        startDates.push(entry.date)
        cycleLengths.push(difference)
        difference = 0
      } else if (difference === -1) {
        startDates.push(entry.date)
        difference = 0
      }
    }

    if (difference > -1) {
      // Tag dictionary starts on day 1
      const cycle = startDates.length
      const cycleDay = difference + 1
      if (cycleTags[cycle]) {
        cycleTags[cycle][cycleDay] = entry.tags
      } else {
        cycleTags.push({ [cycleDay]: entry.tags })
      }
    }
  }

  // Check if we have a full cycle
  if (cycleLengths.length > 0) {
    averageLength = sum(cycleLengths) / cycleLengths.length
    // Do not use latest cycle data for predictions
    tags = merge({}, ...cycleTags.slice(0, cycleTags.length - 1))
  }

  return {
    startDates,
    averageLength,
    tags,
  }
}
