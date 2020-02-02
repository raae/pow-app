import { switchMap, filter } from "rxjs/operators"
import { ofType } from "redux-observable"
import axios from "axios"

import { STRIPE_ENV, STRIPE_KEY, BASE_URL } from "../../constants"

import { selectUser } from "../auth"
import { actions, selectCustomerId } from "./slice"

const {
  validateFulfilled,
  validateFailed,
  createCustomer,
  createCustomerFulfilled,
  createCustomerFailed,
  purchaseFailed,
} = actions

export const validateEpic = (action$, state$) =>
  action$.pipe(
    ofType("subscription/validate"),
    switchMap(async () => {
      const customerId = selectCustomerId(state$.value)
      if (customerId) {
        // There is a customer id,
        // Check if there is a subscription
        try {
          const result = await axios.get("/.netlify/functions/subscription", {
            params: {
              customer_id: customerId,
              stripe_env: STRIPE_ENV,
            },
          })
          return validateFulfilled(result.data)
        } catch ({ message }) {
          return validateFailed({ message })
        }
      } else {
        // No customer id yet, create the customer
        return createCustomer()
      }
    })
  )

export const createCustomerEpic = (action$) =>
  action$.pipe(
    ofType("subscription/createCustomer"),
    switchMap(async () => {
      try {
        const result = await axios.post("/.netlify/functions/customer", null, {
          params: {
            stripe_env: STRIPE_ENV,
          },
        })

        if (!result.data.customerId) {
          throw new Error("No customerId field on result")
        }
        return createCustomerFulfilled(result.data)
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
        const { data } = await axios.post(
          "/.netlify/functions/subscription",
          null,
          {
            params: {
              stripeEnv: STRIPE_ENV,
              customerId: customerId,
              planVariant: payload.variant,
              successUrl: BASE_URL + "/app",
              cancelUrl: BASE_URL + "/price",
            },
          }
        )

        const stripe = window.Stripe(STRIPE_KEY)
        const result = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
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
