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
} from "date-fns"

export const makeDate = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  return date
}

export const entryIdFromDate = (date) => {
  if (!date) {
    date = new Date()
  } else {
    date = makeDate(date)
  }

  if (!isValid(date)) {
    date = new Date()
  }

  return format(date, "yyyy-MM-dd")
}

export const formatDate = (date, formatting = "yyyy-MM-dd", options) => {
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

export const intervalAfterDate = (date, daysAfter) => {
  date = makeDate(date)

  if (!daysAfter) {
    daysAfter = 1
  }

  return eachDayOfInterval({
    start: addDays(date, 1),
    end: addDays(date, daysAfter),
  })
}

export const intervalBeforeDate = (date, daysBefore) => {
  date = makeDate(date)

  if (!daysBefore) {
    daysBefore = 1
  }

  return eachDayOfInterval({
    start: addDays(date, -daysBefore),
    end: addDays(date, -1),
  })
}
