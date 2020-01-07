import { switchMap } from "rxjs/operators"
import { ofType } from "redux-observable"

import { UserSession } from "blockstack"

import slice from "./slice"

const { fetchFulfilled, fetchFailed, saveFulfilled, saveFailed } = slice.actions

const FILE_PATH = "version-0.json"

const userSession = typeof window !== `undefined` ? new UserSession() : null

export const fetchEpic = (action$) =>
  action$.pipe(
    ofType("data/fetch"),
    switchMap(async () => {
      try {
        const data = await userSession.getFile(FILE_PATH)
        if (data) {
          return fetchFulfilled({ data: JSON.parse(data) })
        } else {
          return fetchFulfilled({ data: {} })
        }
      } catch ({ message }) {
        return fetchFailed({ error: { message } })
      }
    })
  )

export const saveEpic = (action$) =>
  action$.pipe(
    ofType("data/save"),
    switchMap(async (action) => {
      try {
        const data = JSON.stringify(action.payload)
        await userSession.putFile(FILE_PATH, data)
        return saveFulfilled({ data: JSON.parse(data) })
      } catch ({ message }) {
        return saveFailed({ error: { message } })
      }
    })
  )

export default [fetchEpic, saveEpic]
