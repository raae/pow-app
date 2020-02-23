import React, { useContext } from "react"

import DataProvider, { DataStateContext, DataActionsContext } from "./provider"

const useDataState = () => {
  const context = useContext(DataStateContext)
  if (context === undefined) {
    throw new Error("useDataState must be used within a AuthProvider")
  }
  return context
}

const useDataActions = () => {
  const context = useContext(DataActionsContext)
  if (context === undefined) {
    throw new Error("useDataActions must be used within a AuthProvider")
  }
  return context
}

const withDataProvider = ({ element }) => {
  return <DataProvider>{element}</DataProvider>
}

export { withDataProvider, DataProvider, useDataState, useDataActions }
