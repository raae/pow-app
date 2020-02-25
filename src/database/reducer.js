import { keyBy, mapValues } from "lodash"
import produce from "immer"

const defaultState = {
  byId: {},
  isPending: true,
  error: null,
}

export const getDefaultState = (databases) => {
  return databases.reduce((acc, { databaseName }) => {
    acc[databaseName] = defaultState
    return acc
  }, {})
}

const reducer = (draft, action) => {
  if (!action.databaseName) throw new Error(`Missing action databaseName`)

  switch (action.type) {
    case "open":
      draft[action.databaseName].isPending = true
      return
    case "openFulfilled":
      draft[action.databaseName].isPending = false
      return
    case "openFailed":
      draft[action.databaseName].isPending = false
      draft[action.databaseName].error = action.error
      return
    case "changed":
      const byId = mapValues(keyBy(action.items, "itemId"), "item")
      draft[action.databaseName].isPending = false
      draft[action.databaseName].byId = byId
      return

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export default produce(reducer)
