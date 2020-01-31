import { createSlice, createSelector } from "@reduxjs/toolkit"

const slice = createSlice({
  name: "data",
  initialState: {
    isInitialized: false,
    isPending: false,
    error: null,
  },
  reducers: {
    fetch: (state) => {
      state.isPending = true
    },
    fetchFulfilled: (state, { payload }) => {
      state.isInitialized = true
      state.isPending = false
      state.data = payload.data
    },
    fetchFailed: (state, { payload }) => {
      state.isPending = false
      state.error = payload.error
    },
    save: (state) => {
      state.isPending = true
    },
    saveFulfilled: (state, { payload }) => {
      state.isPending = false
      state.data = payload.data
    },
    saveFailed: (state, { payload }) => {
      state.isPending = false
      state.error = payload.error
    },
  },
})

const selectSlice = (state) => state[slice.name]

export const selectDataIsInitialized = createSelector(
  [selectSlice],
  (slice) => {
    return slice.isInitialized
  }
)

export const selectDataIsPending = createSelector([selectSlice], (slice) => {
  return slice.isPending
})

export const selectDataError = createSelector([selectSlice], (slice) => {
  return slice.error
})

export const selectPersistedData = createSelector([selectSlice], (slice) => {
  return slice.data
})

export default slice
