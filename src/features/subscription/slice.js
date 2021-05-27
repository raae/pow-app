import { createAsyncThunk } from "@reduxjs/toolkit"
import { loadStripe } from "@stripe/stripe-js"
import userbase from "userbase-js"
import * as yup from "yup"

import {
  STRIPE_KEY,
  STRIPE_MONTHLY_PLAN_ID,
  STRIPE_YEARLY_PLAN_ID,
  BASE_URL,
} from "../../constants"

// =========================================================
//
//  Schemas
//
// =========================================================

export const subscriptionPlanSchema = yup.string().oneOf(["yearly", "monthly"])

// =========================================================
//
//  Thunks / Actions
//
// =========================================================

export const purchaseSubscription = createAsyncThunk(
  "subscription/purchase",
  async ({ plan }) => {
    await loadStripe(STRIPE_KEY)

    await userbase.purchaseSubscription({
      successUrl: BASE_URL + "/timeline",
      cancelUrl: BASE_URL + "/incomplete/payment/?status=canceled",
      priceId:
        plan === "yearly" ? STRIPE_YEARLY_PLAN_ID : STRIPE_MONTHLY_PLAN_ID,
    })
  }
)

export const updateSubscription = createAsyncThunk(
  "subscription/update",
  async () => {
    await loadStripe(STRIPE_KEY)

    await userbase.updatePaymentMethod({
      successUrl: BASE_URL + "/profile",
      cancelUrl: BASE_URL + "/profile/payment/?status=canceled",
    })
  }
)

export const cancelSubscription = createAsyncThunk(
  "subscription/cancel",
  async () => {
    await loadStripe(STRIPE_KEY)

    await userbase.cancelSubscription()
  }
)

export const resumeSubscription = createAsyncThunk(
  "subscription/resume",
  async () => {
    await loadStripe(STRIPE_KEY)

    await userbase.resumeSubscription()
  }
)
