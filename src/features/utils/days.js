import {
  differenceInDays,
  add,
  isBefore,
  isAfter,
  isEqual,
  format,
  isValid,
  eachDayOfInterval,
  addDays,
  startOfDay,
  parseISO,
} from "date-fns"

export const makeDate = (input) => {
  let date = input
  if (!(date instanceof Date)) {
    date = parseISO(input)
  }
  if (!isValid(date)) {
    date = new Date()
  }
  return startOfDay(date)
}

export const entryIdFromDate = (date) => {
  return format(date, "yyyy-MM-dd")
}

export const formatDate = (date, formatting = "yyyy-MM-dd", options) => {
  return format(date, formatting, options)
}

export const daysBetweenDates = (dateA, dateB) => {
  if (!dateA || !dateB) return -1

  return differenceInDays(dateA, dateB)
}

export const addDaysToDate = (date, days) => {
  const newDate = add(date, { days })
  return newDate
}

export const isDateBefore = (date, dateToCompare) => {
  return isBefore(date, dateToCompare)
}

export const isDateAfter = (date, dateToCompare) => {
  return isAfter(date, dateToCompare)
}

export const isDateEqual = (date, dateToCompare) => {
  return isEqual(date, dateToCompare)
}

export const intervalAfterDate = (date, daysAfter) => {
  if (!daysAfter) {
    daysAfter = 1
  }

  return eachDayOfInterval({
    start: addDays(date, 1),
    end: addDays(date, daysAfter),
  })
}

export const intervalBeforeDate = (date, daysBefore) => {
  if (!daysBefore) {
    daysBefore = 1
  }

  return eachDayOfInterval({
    start: addDays(date, -daysBefore),
    end: addDays(date, -1),
  })
}
