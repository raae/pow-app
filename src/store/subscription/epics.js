import { switchMap, filter } from "rxjs/operators"
import { ofType } from "redux-observable"
import axios from "axios"

import {
  BASE_URL,
  STRIPE_KEY,
  STRIPE_MONTHLY_PLAN,
  STRIPE_YEARLY_PLAN,
  STRIPE_LIFETIME_PLAN,
} from "../../constants"

import { selectUser } from "../auth"
import { actions, selectCustomerId } from "./slice"

const {
  validateFulfilled,
  createCustomer,
  createCustomerFulfilled,
  createCustomerFailed,
  purchaseFailed,
} = actions

export const validateEpic = (action$, state$) =>
  action$.pipe(
    ofType("subscription/validate"),
    switchMap(async () => {
      console.log("validate")
      if (selectCustomerId(state$.value)) {
        // Todo run validation again stripe
        return validateFulfilled({ valid: false })
      } else {
        return createCustomer()
      }
    })
  )

export const createCustomerEpic = (action$) =>
  action$.pipe(
    ofType("subscription/createCustomer"),
    switchMap(async () => {
      try {
        const result = await axios.post("/.netlify/functions/customer")

        if (!result.data.customer_id) {
          throw new Error("No customer_id field on result")
        }
        return createCustomerFulfilled({ customerId: result.data.customer_id })
      } catch ({ message }) {
        return createCustomerFailed({ error: { message } })
      }
    })
  )

export const purchaseEpic = (action$, state$) =>
  action$.pipe(
    ofType("subscription/purchase"),
    switchMap(async ({ payload }) => {
      const user = selectUser(state$.value)
      const customerId = selectCustomerId(state$.value)

      if (!user) {
        return purchaseFailed({ error: new Error("No blockstack user") })
      }

      if (!customerId) {
        return purchaseFailed({ error: new Error("No stripe customer id") })
      }

      try {
        let item = { plan: STRIPE_MONTHLY_PLAN }
        if ("yearly" === payload.variant) {
          item = { plan: STRIPE_YEARLY_PLAN }
        } else if ("lifetime" === payload.variant) {
          item = { sku: STRIPE_LIFETIME_PLAN }
        }

        const stripe = window.Stripe(STRIPE_KEY)
        const result = await stripe.redirectToCheckout({
          items: [{ ...item, quantity: 1 }],
          clientReferenceId: customerId,
          successUrl: BASE_URL + "/app?session_id={CHECKOUT_SESSION_ID}",
          cancelUrl: BASE_URL + "/price",
        })

        if (result.error) throw result.error
      } catch ({ message }) {
        return purchaseFailed({ error: { message } })
      }

      return null
    }),
    filter((action) => !!action)
  )

export default [validateEpic, createCustomerEpic, purchaseEpic]
