import { switchMap, filter } from "rxjs/operators"
import { ofType } from "redux-observable"
import axios from "axios"

import { BASE_URL, GATSBY_AUTH_KEY } from "../../constants"

import { selectUser } from "../auth"
import slice from "./slice"

const {
  createCustomerFulfilled,
  createCustomerFailed,
  purchaseFailed,
} = slice.actions

export const createCustomerEpic = (action$) =>
  action$.pipe(
    ofType("subscription/createCustomer"),
    switchMap(async () => {
      try {
        const result = await axios.post("/.netlify/functions/customer")

        if (!result.customer_id) {
          throw new Error("No customer_id field on result")
        }
        return createCustomerFulfilled({ customerId: result.customer_id })
      } catch ({ message }) {
        return createCustomerFailed({ error: { message } })
      }
    })
  )

export const purchaseEpic = (action$, state$) =>
  action$.pipe(
    ofType("subscription/purchase"),
    switchMap(async () => {
      const user = selectUser(state$.value)
      if (!user) return purchaseFailed({ error: new Error("No user") })

      console.log("purchase")
      const stripe = window.Stripe("pk_test_w054bLGABprlKZ19hPAVnxoT00Q9jEdmKb")
      const result = await stripe.redirectToCheckout({
        items: [{ plan: "plan_GdD3zSctSGRvmt", quantity: 1 }],
        clientReferenceId: "clientReferenceId",
        successUrl:
          window.location.origin + "/app?session_id={CHECKOUT_SESSION_ID}",
        cancelUrl: window.location.origin + "/price",
      })

      if (result.error) {
        return purchaseFailed({ error: result.error })
      } else {
        return null
      }
    }),
    filter((action) => !!action)
  )

export default [createCustomerEpic, purchaseEpic]
