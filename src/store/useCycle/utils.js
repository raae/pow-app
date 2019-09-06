import { values, sum } from "lodash"
import { differenceInDays, addDays, format } from "date-fns"

const getLastInArray = (array) => {
  const index = array.length > 0 ? array.length - 1 : 0
  return array[index]
}

const replaceLastItemInArray = (array, item) => {
  const index = array.length > 0 ? array.length - 1 : 0
  array[index] = item
}

export const daysBetweenDates = (dateA, dateB) => {
  if (!(dateA instanceof Date)) {
    dateA = new Date(dateA)
  }
  if (!(dateB instanceof Date)) {
    dateB = new Date(dateB)
  }

  if (isNaN(dateA.valueOf()) || isNaN(dateB.valueOf())) return 0

  return Math.abs(differenceInDays(dateA, dateB))
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
  const sortedEntries = values(entriesByDate).sort((a, b) =>
    a.date > b.date ? -1 : 1
  )

  const startDates = []
  const cycleLengths = []
  let averageLength = undefined

  for (let entry of sortedEntries) {
    if (entryHasTag(entry, tag)) {
      const lastStartDate = getLastInArray(startDates)
      let difference = daysBetweenDates(entry.date, lastStartDate)

      if (difference >= 14) {
        startDates.push(entry.date)
        cycleLengths.push(difference)
      } else {
        replaceLastItemInArray(startDates, entry.date)

        if (difference > 0 && cycleLengths.length > 0) {
          difference = getLastInArray(cycleLengths) + difference
          replaceLastItemInArray(cycleLengths, difference)
        }
      }
    }
  }

  if (cycleLengths.length > 0) {
    averageLength = sum(cycleLengths) / cycleLengths.length
  }

  return {
    startDates,
    averageLength,
    tags: {},
  }
}
