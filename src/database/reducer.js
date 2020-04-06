import { keyBy } from "lodash"
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
      // This happens on all changed to user,
      // draft[action.databaseName].isPending = true
      return
    case "openFulfilled":
      draft[action.databaseName].isPending = false
      return
    case "openFailed":
      draft[action.databaseName].isPending = false
      draft[action.databaseName].error = action.error
      return
    case "insert":
    case "update":
      if (!draft[action.databaseName].byId[action.itemId]) {
        draft[action.databaseName].byId[action.itemId] = {}
      }
      const item = draft[action.databaseName].byId[action.itemId].item
      draft[action.databaseName].byId[action.itemId].item = action.item
      draft[action.databaseName].byId[action.itemId].original = item
      draft[action.databaseName].byId[action.itemId].isPending = true
      return
    case "insertFulfilled":
    case "updateFulfilled":
      draft[action.databaseName].byId[action.itemId].isPending = false
      return
    case "insertFailed":
    case "updateFailed":
      const original = draft[action.databaseName].byId[action.itemId].original
      draft[action.databaseName].byId[action.itemId].item = original
      draft[action.databaseName].byId[action.itemId].original = null
      draft[action.databaseName].byId[action.itemId].isPending = false
      draft[action.databaseName].byId[action.itemId].error = action.error
      return
    case "changed":
      const byId = keyBy(action.items, "itemId")
      draft[action.databaseName].isPending = false
      draft[action.databaseName].byId = byId
      return

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export default produce(reducer)
