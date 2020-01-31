import { createSlice, createSelector } from "@reduxjs/toolkit"

import authSlice from "../auth"
import dataSlice from "../data"

const initialState = {
  customerId: null,
  isVerified: false,
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
      state.customerId = payload.customerId
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
      state.customerId = payload.customerId
      state.isVerified = true
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
      state.isVerified = true
    },
    validateFailed: (state) => {
      state.isPending = false
      state.isVerified = false
    },
  },
  extraReducers: {
    [dataSlice.actions.fetchFulfilled]: (state, { payload: { data } }) => {
      state.customerId = state.customerId || data.subscription.customerId
    },
    [authSlice.actions.signOut]: () => {
      return initialState
    },
  },
})

const selectSlice = (state) => state[slice.name]

export const selectCustomerId = createSelector([selectSlice], (slice) => {
  return slice.customerId
})

export const selectSubscriptionData = createSelector(
  [selectCustomerId],
  (customerId) => {
    return {
      customerId,
    }
  }
)

export const actions = slice.actions

export default slice
