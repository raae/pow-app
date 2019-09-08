import { values, sum } from "lodash"
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
  const tags = {}
  let averageLength = undefined

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
      difference++
      if (tags[difference]) {
        tags[difference] = new Set([...tags[difference], ...entry.tags])
      } else {
        tags[difference] = new Set(entry.tags)
      }
    }
  }

  if (cycleLengths.length > 0) {
    averageLength = sum(cycleLengths) / cycleLengths.length
  }

  return {
    startDates,
    averageLength,
    tags,
  }
}
