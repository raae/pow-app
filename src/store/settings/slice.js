import { keys } from "lodash"
import { createSlice, createSelector } from "@reduxjs/toolkit"

import authSlice from "../auth"
import dataSlice from "../data"

const initialState = {
  menstruation: {
    tag: undefined,
    timestamp: undefined,
  },
}

const slice = createSlice({
  name: "settings",
  initialState: initialState,
  reducers: {
    updateMenstruationTag: {
      reducer: (state, { payload }) => {
        state.menstruation = payload
      },
      prepare: ({ tag }) => {
        return {
          payload: {
            tag: tag,
            timestamp: Date.now(),
          },
        }
      },
    },
  },
  extraReducers: {
    [dataSlice.actions.fetchFulfilled]: (state, { payload: { data } }) => {
      const settings = data.settings || {}
      keys(settings).forEach((key) => {
        const existing = state[key] || {}
        const noExistingTimestamp = !existing.timestamp
        const existingIsOlder = settings[key].timestamp >= existing.timestamp

        if (noExistingTimestamp || existingIsOlder) {
          state[key] = settings[key]
        }
      })
    },
    [authSlice.actions.signOut]: () => {
      return initialState
    },
  },
})

const selectSlice = (state) => state[slice.name]

export const selectSettings = createSelector([selectSlice], (slice) => {
  return slice
})

export const selectMenstruationTag = createSelector([selectSlice], (slice) => {
  return slice.menstruation.tag
})

export const actions = slice.actions

export default slice
