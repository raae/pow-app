import React, { useEffect, createContext, useReducer } from "react"
import userbase from "userbase-js"

import { reducer, getDefaultState } from "./reducer"
import { useAuthState } from "../auth"

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
    if (!user) return
    databases.forEach(({ databaseName }) => {
      dispatch({ type: "open", databaseName })
      userbase
        .openDatabase({
          databaseName,
          changeHandler: (items) => {
            console.log("Database changed", databaseName)
            dispatch({ type: "changed", databaseName, items })
          },
        })
        .then(() => {
          console.log("Database opened", databaseName)
          dispatch({ type: "openFulfilled", databaseName })
        })
        .catch((error) => {
          console.log("Database failed to opened", databaseName, error.message)
          dispatch({ type: "openFailed", databaseName, error })
        })
    })
  }, [user, databases])

  const addItem = (params) => {
    return userbase
      .insertItem(params)
      .then(() => {
        console.log("Item added", params.itemId)
        return params.item
      })
      .catch((error) => {
        console.log("Item not added", params.itemId, error.message)
        return { error }
      })
  }

  const updateItem = (params) => {
    return userbase
      .updateItem(params)
      .then(() => {
        console.log("Item updated", params.itemId)
        return params.item
      })
      .catch((error) => {
        console.log("Item not updated", params.itemId, error.message)
        return { error }
      })
  }

  const actions = React.useMemo(() => {
    return databases.reduce((acc, { databaseName, entity }) => {
      acc[`add${entity}`] = (id, item) => {
        return addItem({ itemId: id, item, databaseName })
      }
      acc[`update${entity}`] = (id, item) => {
        return updateItem({ itemId: id, item, databaseName })
      }

      return acc
    }, {})
  }, [databases])

  return (
    <DataStateContext.Provider value={state}>
      <DataActionsContext.Provider value={actions}>
        {children}
      </DataActionsContext.Provider>
    </DataStateContext.Provider>
  )
}

export default DataProvider
