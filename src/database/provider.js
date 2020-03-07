import React, { createContext, useReducer } from "react"
import { mapValues } from "lodash"
import userbase from "userbase-js"

import { useAuthState } from "../auth"

import reducer, { getDefaultState } from "./reducer"
import { useEffect } from "react"
import initDatabases from "./initDatabases"

export const DataStateContext = createContext()
export const DataActionsContext = createContext()

const DataProvider = ({ children, databases = [] }) => {
  const [state, dispatch] = useReducer(reducer, getDefaultState(databases))
  const { user } = useAuthState()

  useEffect(() => {
    if (!user) return
    initDatabases({ user, databases, dispatch, userbase })
  }, [user, databases])

  const upsertItem = (params) => {
    const { databaseName, itemId } = params
    console.log(`upsert${databaseName}`, itemId)

    if (state[databaseName].byId[itemId] !== undefined) {
      return updateItem(params)
    } else {
      return insertItem(params)
    }
  }

  const insertItem = (params) => {
    const { databaseName, itemId } = params
    console.log(`insert${databaseName}`, itemId)

    dispatch({ type: "insert", ...params })

    return userbase
      .insertItem(params)
      .then(() => {
        dispatch({ type: "insertFulfilled", ...params })
        console.log(`insert${databaseName} fulfilled`, itemId)
        return true
      })
      .catch((error) => {
        dispatch({ type: "insertFailed", ...params })
        console.log(`insert${databaseName} failed`, itemId, error.message)
        return { error }
      })
  }

  const updateItem = (params) => {
    const { databaseName, itemId } = params
    console.log(`update${databaseName}`, itemId)

    dispatch({ type: "update", ...params })

    return userbase
      .updateItem(params)
      .then(() => {
        dispatch({ type: "updateFulfilled", ...params })
        console.log(`update${databaseName} fulfilled`, itemId)
        return true
      })
      .catch((error) => {
        dispatch({ type: "updateFailed", error, ...params })
        console.log(`update${databaseName} failed`, error.message, itemId)
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
    acc[databaseName] = mapValues(state[databaseName].byId, "item")
    acc.isPending = acc.isPending || state[databaseName].isPending
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
