import { createSlice, createSelector } from "@reduxjs/toolkit"
import { differenceInCalendarDays, addDays } from "date-fns"

const initialState = {
  isInitialized: false,
  isCalculating: false,
  averageCycleLength: undefined,
  currentCycleStartDate: undefined,
  currentPredictionsByCycleDay: {},
  futurePredictionsByCycleDay: {},
}

const slice = createSlice({
  name: "cycle",
  initialState,
  reducers: {
    calculate: (state) => {
      state.isCalculating = true
    },
    calculationCompleted: (state, action) => {
      const {
        averageCycleLength,
        currentCycleStartDate,
        tagsForCurrentCycle,
        tagsForFutureCycles,
      } = action.payload

      state.isInitialized = true
      state.isCalculating = false
      state.averageCycleLength = averageCycleLength
      state.currentCycleStartDate = currentCycleStartDate
      state.currentPredictionsByCycleDay = tagsForCurrentCycle
      state.futurePredictionsByCycleDay = tagsForFutureCycles
    },
  },
})

const selectSlice = (state) => state[slice.name]
const selectDate = (state, props) => props.date

const calculateCycleDay = (startDate, cycleLength, date) => {
  if (!startDate || !cycleLength) return

  const daysSinceStartDate = differenceInCalendarDays(date, startDate)
  const cycleDay = Math.floor(daysSinceStartDate % cycleLength)

  if (cycleDay < 0) {
    return cycleDay + cycleLength
  } else {
    return cycleDay
  }
}

export const selectCalculationIsInitialized = createSelector(
  [selectSlice],
  (slice) => {
    return slice.isInitialized
  }
)

export const selectCurrentCycleStartDate = createSelector(
  [selectSlice],
  (slice) => {
    const startDate = slice.currentCycleStartDate
    if (startDate) {
      return new Date(startDate)
    }
  }
)

export const selectAverageCycleLength = createSelector(
  [selectSlice],
  (slice) => {
    return slice.averageCycleLength
  }
)

export const selectNextStartDate = createSelector(
  [selectCurrentCycleStartDate, selectAverageCycleLength],
  (startDate, cycleLength) => {
    if (startDate && cycleLength) {
      const nextDate = addDays(startDate, cycleLength)
      return nextDate
    }
  }
)

export const selectCycleDayForDate = createSelector(
  [selectCurrentCycleStartDate, selectAverageCycleLength, selectDate],
  (startDate, cycleLength, date) => {
    return calculateCycleDay(startDate, cycleLength, date)
  }
)

export const selectHumanCycleDayForDate = createSelector(
  [selectCurrentCycleStartDate, selectDate],
  (startDate, date) => {
    const daysSinceStartDate = differenceInCalendarDays(date, startDate)
    return daysSinceStartDate + 1
  }
)

export const selectHumanCycleDayForToday = (state) =>
  selectHumanCycleDayForDate(state, { date: new Date() })

export const selectPredictionsForDate = createSelector(
  [
    selectSlice,
    selectCurrentCycleStartDate,
    selectAverageCycleLength,
    selectDate,
  ],
  (slice, startDate, cycleLength, date) => {
    const cycleDay = calculateCycleDay(startDate, cycleLength, date)
    const daysSinceStartDate = differenceInCalendarDays(date, startDate)

    if (daysSinceStartDate < 0) return

    let predictions = []

    if (daysSinceStartDate >= cycleLength) {
      predictions = slice.futurePredictionsByCycleDay[cycleDay]
    } else {
      predictions = slice.currentPredictionsByCycleDay[cycleDay]
    }

    return [...new Set(predictions)]
  }
)

export default slice
