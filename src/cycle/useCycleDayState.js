import { useContext } from "react"
import { countBy, mergeWith, toPairs, last, first } from "lodash"

import { tagsFromText } from "../utils/tags"
import {
  daysBetweenDates,
  isDateBefore,
  isDateAfter,
  isDateEqual,
} from "../utils/days"

import { CycleSateContext } from "./provider"
import { isAfter } from "date-fns"

const useCycleDayState = ({ date, note }) => {
  const context = useContext(CycleSateContext)

  if (context === undefined) {
    throw new Error("useCycleState must be used within a CycleProvider")
  }

  if (!context.nextStartDate) {
    return {
      cycleDay: undefined,
      tags: [],
      isMenstruation: false,
      daysBetweenCalculated: true,
      daysBetween: 28,
      prediction: {
        tags: [],
        isMenstruation: false,
      },
    }
  }

  const cycleDay = cycleDayForDate(date, context)
  const noteTags = tagsFromText(note)
  const cycleTags = tagsForCycleDay(cycleDay, context)
  const cycleTagsCount = countBy(cycleTags)
  const noteTagsCount = countBy(noteTags)

  mergeWith(cycleTagsCount, noteTagsCount, (objValue = 0, srcValue = 0) => {
    return (objValue - srcValue) / (context.startDates.length - 1)
  })

  const tags = toPairs(cycleTagsCount)
    .map(([tag, frequency]) => ({ tag, frequency }))
    .filter(({ frequency }) => frequency > 0)

  return {
    cycleDay: cycleDay + 1,
    tags: noteTags,
    isMenstruation: tagsIncludeMenstruation(noteTags, context),
    nextStartDate: context.nextStartDate,
    daysBetween: context.daysBetween,
    daysBetweenCalculated: context.daysBetweenCalculated,
    prediction: {
      tags: tags,
      isMenstruation: tagsIncludeMenstruation(cycleTags, context),
    },
    isCurrentCycle: isCurrentCycle(date, context),
  }
}

export default useCycleDayState

/// Helpers

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

const tagsForCycleDay = (day, { tags }) => {
  return tags[day] || []
}

const tagsIncludeMenstruation = (tags = [], { tag }) => {
  return tags.includes(tag)
}

const isCurrentCycle = (date, { daysBetween, startDates }) => {
  const latestStartDate = last(startDates)
  return (
    isDateAfter(date, latestStartDate) &&
    daysBetweenDates(date, latestStartDate) < daysBetween
  )
}
