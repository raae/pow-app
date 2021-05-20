import { createSelector } from "@reduxjs/toolkit"
import { first, last, countBy, toPairs, intersection } from "lodash"

import { selectAllEntries, selectEntryTags } from "../entries"
import { selectSettings } from "../settings"

import {
  daysBetweenDates,
  isDateBefore,
  isDateAfter,
  isDateEqual,
  makeDate,
} from "../utils/days"

import analyze from "./analyze"

const selectDate = (state, props) => {
  return props.date
}

export const selectAllAnalyticsEntries = createSelector(
  [selectAllEntries, selectSettings],
  (entries, { mensesTags }) => {
    return entries.map(({ entryId, tags }) => {
      const isMenses = intersection(tags, mensesTags).length > 0
      const date = makeDate(entryId)
      return {
        date,
        tags,
        isMenses,
      }
    })
  }
)

const selectAnalytics = createSelector(
  [selectAllAnalyticsEntries, selectSettings],
  (entries, { initialCycleLength }) => {
    const analytics = analyze({
      sortedEntries: entries,
      initialDaysBetween: initialCycleLength,
    })

    return analytics
  }
)

export const selectDaysBetween = createSelector(
  [selectAnalytics],
  (analytics) => {
    return analytics.daysBetween
  }
)

export const selectIsDaysBetweenCalculated = createSelector(
  [selectAnalytics],
  (analytics) => {
    return analytics.isDaysBetweenCalculated
  }
)

export const selectNextStartDate = createSelector(
  [selectAnalytics],
  (analytics) => {
    return analytics.nextStartDate
  }
)

export const selectCycleDayForDate = createSelector(
  [selectDate, selectAnalytics],
  (date, analytics) => {
    return cycleDayForDate(date, analytics) + 1
  }
)

export const selectTagsForDate = createSelector(
  [selectDate, selectAnalytics, selectEntryTags],
  (date, analytics, tags = []) => {
    const cycleDay = cycleDayForDate(date, analytics)
    const predictedTags = analytics.tags[cycleDay] || []
    const predictedTagsCount = countBy(predictedTags)

    return toPairs(predictedTagsCount).map(([tag, count]) => {
      return {
        tag,
        count,
        logged: tags.includes(tag),
        predicted: tags.includes(tag) ? count - 1 > 0 : true,
        sortOrder: count,
      }
    })
  }
)

export const selectHasPredictionsForDate = createSelector(
  [selectTagsForDate],
  (predictedTags) => {
    return predictedTags && predictedTags.length !== 0
  }
)

export const selectPredictedMenstruationForDate = createSelector(
  [selectTagsForDate, selectSettings],
  (tags = [], { mensesTags }) => {
    return !!tags.find(({ tag }) => mensesTags.includes(tag))
  }
)

export const selectIsDateCurrentCycle = createSelector(
  [selectDate, selectAnalytics],
  (date, analytics) => {
    return isCurrentCycle(date, analytics)
  }
)

// HELPERS

export const cycleDayForDate = (date, { daysBetween, startDates }) => {
  if (startDates.length < 1) return

  const earliestStartDate = first(startDates)
  const latestStartDate = last(startDates)

  if (isDateBefore(date, earliestStartDate)) {
    // Earlier than earliest start date, calculate
    let difference = daysBetweenDates(date, earliestStartDate)
    const cycleDay = difference % daysBetween
    return cycleDay === 0 ? cycleDay : cycleDay + daysBetween
  } else if (isDateAfter(date, latestStartDate)) {
    // Later than latest start date, calculate
    let difference = daysBetweenDates(date, latestStartDate)
    return difference % daysBetween
  } else {
    // Inside cycles, use actual days
    // Later should check if these are too long,
    // and if so do some calculations
    const earlierStartDates = startDates.filter((startDate) => {
      return isDateAfter(date, startDate) || isDateEqual(date, startDate)
    })
    const startDate = last(earlierStartDates)
    return daysBetweenDates(date, startDate)
  }
}

const isCurrentCycle = (date, { daysBetween, startDates }) => {
  const latestStartDate = last(startDates)
  const isDateOnOrAfter =
    isDateEqual(date, latestStartDate) || isDateAfter(date, latestStartDate)

  return (
    isDateOnOrAfter && daysBetweenDates(date, latestStartDate) < daysBetween
  )
}
