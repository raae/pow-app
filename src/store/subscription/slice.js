import { createSlice, createSelector } from "@reduxjs/toolkit"

import authSlice from "../auth"
import dataSlice from "../data"

const initialState = {
  data: {
    customerId: null,
    lastVerified: null,
  },
  isPending: false,
  error: null,
}

const slice = createSlice({
  name: "subscription",
  initialState: initialState,
  reducers: {
    createCustomer: (state) => {
      state.isPending = true
    },
    createCustomerFulfilled: (state, { payload }) => {
      state.isPending = false
      state.data.customerId = payload.customerId
    },
    createCustomerFailed: (state, { payload }) => {
      state.isPending = false
      state.error = payload.error
    },
    purchase: (state) => {
      state.isPending = true
    },
    purchaseFulfilled: (state, { payload }) => {
      state.isPending = false
      state.data.customerId = payload.customerId
      state.data.lastVerified = Date.now()
    },
    purchaseFailed: (state, { payload }) => {
      state.isPending = false
      state.error = payload.error
    },
    validate: (state) => {
      state.isPending = false
    },
    validateFulfilled: (state) => {
      state.isPending = false
    },
    validateFailed: (state) => {
      state.data.customerId = null
    },
  },
  extraReducers: {
    [dataSlice.actions.fetchFulfilled]: (state, { payload: { data } }) => {
      state.data = data.subscription || initialState
    },
    [authSlice.actions.signOut]: () => {
      return initialState
    },
  },
})

const selectSlice = (state) => state[slice.name]

export const selectCustomerId = createSelector([selectSlice], (slice) => {
  return slice.data.customerId
})

export const selectSubscription = createSelector([selectSlice], (slice) => {
  return slice.data
})

export const actions = slice.actions

export default slice
