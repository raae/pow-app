import { createSlice, createSelector } from "@reduxjs/toolkit"

const initialState = {
  isPending: true,
  user: null,
  error: null,
}

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    signIn: (state) => {
      state.isPending = true
    },
    signInFulfilled: (state, { payload }) => {
      state.isPending = false
      state.user = payload.user
      state.error = null
    },
    signInFailed: (state, { payload }) => {
      state.isPending = false
      state.user = null
      state.error = payload.error
    },
    signOut: (state) => {
      state.isPending = true
      state.user = null
    },
  },
})

const selectSlice = (state) => state[slice.name]

export const selectUser = createSelector([selectSlice], (slice) => {
  return slice.user
})

export const selectAuthIsPending = createSelector([selectSlice], (slice) => {
  return slice.isPending
})

export const selectAuthError = createSelector([selectSlice], (slice) => {
  return slice.error
})

export default slice
