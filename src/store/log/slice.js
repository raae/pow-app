import { values } from "lodash"
import { createSlice, createSelector } from "@reduxjs/toolkit"
import { formatDateToEntryKey, tagsFromNote } from "./utils"

import authSlice from "../auth"
import dataSlice from "../data"

const initialState = {
  entriesByDate: {},
}

const slice = createSlice({
  name: "log",
  initialState: initialState,
  reducers: {
    updateEntry: {
      reducer: (state, { payload }) => {
        state.entriesByDate[payload.date] = payload
      },
      prepare: ({ note, date }) => {
        return {
          payload: {
            note: note,
            timestamp: Date.now(),
            date: formatDateToEntryKey(date),
            tags: tagsFromNote(note),
          },
        }
      },
    },
  },
  extraReducers: {
    [dataSlice.actions.fetchFulfilled]: (state, { payload: { data } }) => {
      const entriesByDate = data.entriesByDate || {}
      values(entriesByDate).forEach((entry) => {
        const existing = state.entriesByDate[entry.date] || {}
        const noExistingTimestamp = !existing.timestamp
        const existingIsOlder = entry.timestamp >= existing.timestamp

        if (noExistingTimestamp || existingIsOlder) {
          state.entriesByDate[entry.date] = entry
        }
      })
    },
    [authSlice.actions.signOut]: () => {
      return initialState
    },
  },
})

const selectSlice = (state) => state[slice.name]

export const selectAllEntriesByDate = createSelector([selectSlice], (slice) => {
  return slice.entriesByDate
})

export const selectEntryForDate = createSelector(
  [selectSlice, (state, props) => props.date],
  (slice, date) => {
    const dateKey = formatDateToEntryKey(date)
    const entry = slice.entriesByDate[dateKey]
    return entry
  }
)

export const actions = slice.actions

export default slice
