import { createSlice, createSelector } from "@reduxjs/toolkit"

import authSlice from "../auth"
import dataSlice from "../data"

const initialState = {
  customerId: null,
  subscriptionId: null,
  isAuthorized: false,
  isPending: true,
  error: null,
}

const slice = createSlice({
  name: "subscription",
  initialState: initialState,
  reducers: {
    validate: (state) => {
      state.isPending = true
    },
    validateFulfilled: (state, { payload }) => {
      state.isPending = false
      state.subscriptionId = payload.subscriptionId
      state.isAuthorized = payload.subscriptionIsValid
    },
    validateFailed: (state, { payload }) => {
      state.isPending = false
      // Set true, so app can be used if Stripe fails etc.
      state.isAuthorized = true
      state.error = payload.error
    },
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
  },
  extraReducers: {
    [dataSlice.actions.fetchFulfilled]: (state, { payload: { data } }) => {
      if (!state.customerId && data.subscription) {
        state.customerId = data.subscription.customerId
      }
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

export const selectSubscriptionIsPending = createSelector(
  [selectSlice],
  (slice) => {
    return slice.isPending
  }
)

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
