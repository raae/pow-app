import {
  differenceInDays,
  add,
  isBefore,
  isAfter,
  isEqual,
  format,
} from "date-fns"

const entryIdFromDate = (date) => format(date, "yyyy-MM-dd")

const makeDate = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  return date
}

export const formatDate = (date, formatting, options) => {
  date = makeDate(date)
  return format(date, formatting, options)
}

export const daysBetweenDates = (dateA, dateB) => {
  dateA = makeDate(dateA)
  dateB = makeDate(dateB)

  if (isNaN(dateA.valueOf()) || isNaN(dateB.valueOf())) return -1

  return differenceInDays(dateA, dateB)
}

export const addDaysToDate = (date, days) => {
  date = makeDate(date)
  const newDate = add(date, { days })
  return entryIdFromDate(newDate)
}

export const isDateBefore = (date, dateToCompare) => {
  date = makeDate(date)
  dateToCompare = makeDate(dateToCompare)

  return isBefore(date, dateToCompare)
}

export const isDateAfter = (date, dateToCompare) => {
  date = makeDate(date)
  dateToCompare = makeDate(dateToCompare)

  return isAfter(date, dateToCompare)
}

export const isDateEqual = (date, dateToCompare) => {
  date = makeDate(date)
  dateToCompare = makeDate(dateToCompare)

  return isEqual(date, dateToCompare)
}
