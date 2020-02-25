import React, { createContext, useReducer } from "react"
import userbase from "userbase-js"

import { reducer, getDefaultState } from "./reducer"
import { useAuthState } from "../auth"
import { useEffect } from "react"
import initDatabases from "./initDatabases"

export const DataStateContext = createContext()
export const DataActionsContext = createContext()

const DATABASES = [
  { databaseName: "entries", entity: "Entry" },
  { databaseName: "cycle", entity: "Cycle" },
]

const DataProvider = ({ children, databases = DATABASES }) => {
  const { user } = useAuthState()
  const [state, dispatch] = useReducer(reducer, getDefaultState(databases))

  useEffect(() => {
    initDatabases({ user, databases, dispatch, userbase })
  }, [user, databases])

  const upsertItem = (params) => {
    const { databaseName, itemId } = params

    if (state[databaseName].byId[itemId]) {
      return updateItem(params)
    } else {
      return insertItem(params)
    }
  }

  const insertItem = (params) => {
    const { databaseName, itemId } = params

    return userbase
      .insertItem(params)
      .then(() => {
        console.log("Item added", databaseName, itemId)
        return params.item
      })
      .catch((error) => {
        console.log("Item not added", databaseName, itemId, error.message)
        return { error }
      })
  }

  const updateItem = (params) => {
    const { databaseName, itemId } = params

    return userbase
      .updateItem(params)
      .then(() => {
        console.log("Item updated", databaseName, itemId)
        return params.item
      })
      .catch((error) => {
        console.log("Item not updated", databaseName, itemId, error.message)
        return { error }
      })
  }

  // Create inset, update and upsert action for each database
  // ie. updateEntry, insertEntry and upsertEntry
  // for { databaseName: "entries", entity: "Entry" }
  const actions = databases.reduce((acc, { databaseName, entity }) => {
    acc[`insert${entity}`] = (id, item) => {
      return insertItem({
        itemId: id,
        item,
        databaseName,
      })
    }
    acc[`update${entity}`] = (id, item) => {
      return updateItem({
        itemId: id,
        item,
        databaseName,
      })
    }
    acc[`upsert${entity}`] = (id, item) => {
      return upsertItem({
        itemId: id,
        item,
        databaseName,
      })
    }
    return acc
  }, {})

  const consumerState = databases.reduce((acc, { databaseName }) => {
    acc[databaseName] = state[databaseName].byId
    acc.isPending = acc.isPending && state[databaseName].isPending
    return acc
  }, {})

  return (
    <DataStateContext.Provider value={consumerState}>
      <DataActionsContext.Provider value={actions}>
        {children}
      </DataActionsContext.Provider>
    </DataStateContext.Provider>
  )
}

export default DataProvider
