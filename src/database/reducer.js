import { keyBy, mapValues } from "lodash"

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

export const reducer = (state, action) => {
  if (!action.databaseName) throw new Error(`Missing action databaseName`)

  switch (action.type) {
    case "open":
      return {
        ...state,
        [action.databaseName]: {
          ...state[action.databaseName],
          isPending: true,
        },
      }
    case "openFulfilled":
      return {
        ...state,
        [action.databaseName]: {
          ...state[action.databaseName],
          isPending: false,
        },
      }
    case "openFailed":
      return {
        ...state,
        [action.databaseName]: {
          ...state[action.databaseName],
          isPending: false,
          error: action.error,
        },
      }
    case "changed":
      return {
        ...state,
        [action.databaseName]: {
          ...state[action.databaseName],
          isPending: false,
          byId: mapValues(keyBy(action.items, "itemId"), "item"),
        },
      }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
