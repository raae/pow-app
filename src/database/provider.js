import React, { useEffect, createContext, useReducer } from "react"
import userbase from "userbase-js"

import { reducer, getDefaultState } from "./reducer"
import { useAuthState } from "../auth"

export const DataStateContext = createContext()
export const DataActionsContext = createContext()

const DATABASES = [
  { databaseName: "entries", entity: "entry" },
  { databaseName: "settings", entity: "setting" },
]

const DataProvider = ({ children, databases = DATABASES }) => {
  const { user } = useAuthState()
  const [state, dispatch] = useReducer(reducer, getDefaultState(databases))

  useEffect(() => {
    if (!user) return
    databases.forEach(({ databaseName }) => {
      dispatch({ type: "open", databaseName })
      userbase
        .openDatabase({
          databaseName,
          changeHandler: (items) => {
            dispatch({ type: "changed", databaseName, items })
          },
        })
        .then(() => {
          dispatch({ type: "openFulfilled", databaseName })
        })
        .catch((error) => {
          dispatch({ type: "openFailed", databaseName, error })
        })
    })
  }, [user, databases])

  const addItem = async (params) => {
    return userbase.insertItem(params)
  }

  const updateItem = async (params) => {
    return userbase.updateItem(params)
  }

  const actions = React.useMemo(() => {
    return databases.reduce((acc, { entity }) => {
      acc[`add${entity}`] = (id, item) => {
        return addItem({ itemId: id, item })
      }
      acc[`update${entity}`] = (id, item) => {
        return updateItem({ itemId: id, item })
      }

      return acc
    }, {})
  }, [databases])

  const dataState = databases.reduce((acc, { databaseName }) => {
    acc[databaseName] = state[databaseName].byId
    return acc
  }, {})
  dataState.isPending = databases.reduce((acc, { databaseName }) => {
    return acc && state[databaseName].isPending
  }, {})

  return (
    <DataStateContext.Provider value={dataState}>
      <DataActionsContext.Provider value={actions}>
        {children}
      </DataActionsContext.Provider>
    </DataStateContext.Provider>
  )
}

export default DataProvider
