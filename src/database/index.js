import { useContext } from "react"

import DataProvider, { DataStateContext, DataActionsContext } from "./provider"

export const useDataState = () => {
  const context = useContext(DataStateContext)
  if (context === undefined) {
    throw new Error("useDataState must be used within a DataProvider")
  }
  return context
}

export const useDataActions = () => {
  const context = useContext(DataActionsContext)
  if (context === undefined) {
    throw new Error("useDataActions must be used within a DataProvider")
  }
  return context
}

export default DataProvider
