import { createSelector } from "@reduxjs/toolkit"
import { first, last, countBy, toPairs } from "lodash"

import { selectEntriesSortedByDate, selectEntryTags } from "../entries"
import { selectMenstruationTag, selectInitialDaysBetween } from "../settings"

import {
  makeDate,
  daysBetweenDates,
  isDateBefore,
  isDateAfter,
  isDateEqual,
} from "../utils/days"

import analyze from "./analyze"

const selectDate = (state, props) => {
  return props.date
}

const selectAnalytics = createSelector(
  [selectEntriesSortedByDate, selectMenstruationTag, selectInitialDaysBetween],
  (sortedEntries, menstruationTag, initialDaysBetween) => {
    const analytics = analyze({
      sortedEntries,
      menstruationTag,
      initialDaysBetween,
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

export const selectPredictedTagsForDate = createSelector(
  [selectDate, selectAnalytics, selectEntryTags],
  (date, analytics, tags = []) => {
    const cycleDay = cycleDayForDate(date, analytics)
    const predictedTags = analytics.tags[cycleDay] || []
    const predictedTagsCount = countBy(predictedTags)
    return toPairs(predictedTagsCount)
      .map(([tag, count]) => ({
        tag,
        count: tags.includes(tag) ? count - 1 : count,
        logged: tags.includes(tag),
      }))
      .filter((tag) => tag.count > 0)
  }
)

export const selectPredictedMenstruationForDate = createSelector(
  [selectPredictedTagsForDate, selectMenstruationTag],
  (tags = [], menstruationTag) => {
    return !!tags.find(({ tag }) => tag === menstruationTag)
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
