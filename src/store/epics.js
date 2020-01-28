import { fromEvent, merge } from "rxjs"
import { map, filter, switchMap, take } from "rxjs/operators"

import { selectSettings, selectMenstruationTag } from "./settings"
import { selectAllEntriesByDate } from "./log"
import { calculateCycle } from "./cycle"
import { fetchData, saveData } from "./data"
import { selectUser } from "./auth"
import {
  selectCustomerId,
  selectSubscription,
  createCustomer,
} from "./subscription"

export const calculateCycleEpic = (action$, state$) =>
  action$.pipe(
    filter((action) => {
      return (
        action.type.includes("fetchFulfilled") || action.type.includes("update")
      )
    }),
    map(() => {
      const entriesByDate = selectAllEntriesByDate(state$.value)
      const menstruationTag = selectMenstruationTag(state$.value)

      return calculateCycle({ entriesByDate, menstruationTag })
    })
  )

export const createSubscriptionCustomerEpic = (action$, state$) =>
  action$.pipe(
    filter((action) => {
      return (
        action.type.includes("signInFulfilled") &&
        !selectCustomerId(state$.value)
      )
    }),
    map(() => {
      return createCustomer()
    })
  )

export const fetchDataEpic = (action$, state$) =>
  merge(
    action$.pipe(
      filter((action) => {
        return (
          action.type.includes("signInFulfilled") ||
          action.type.includes("update")
        )
      })
    ),
    // Also fetch data when window regains focus
    fromEvent(window, "focus").pipe(filter(() => !!selectUser(state$.value)))
  ).pipe(
    map(() => {
      return fetchData()
    })
  )

export const saveDataEpic = (action$, state$) =>
  // Save data when an update is followed by one fetch fulfilled
  // so that new data is merged in
  action$.pipe(
    filter((action) => {
      return action.type.includes("update")
    }),
    switchMap(() => {
      return action$.pipe(
        filter((action) => {
          return action.type.includes("fetchFulfilled")
        }),
        take(1),
        map(() => {
          return saveData({
            settings: selectSettings(state$.value),
            subscription: selectSubscription(state$.value),
            entriesByDate: selectAllEntriesByDate(state$.value),
          })
        })
      )
    })
  )

export default [
  calculateCycleEpic,
  createSubscriptionCustomerEpic,
  fetchDataEpic,
  saveDataEpic,
]
