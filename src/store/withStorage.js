import React from "react"
import { StoreProvider } from "./store.js"
import usePersistStorage from "./syncToStorage"
import { DEFAULT_STATE } from "./constants"

const StoreSync = ({ children }) => {
  usePersistStorage()
  return children
}

const withStorage = ({ element }) => {
  return (
    <StoreProvider initialValue={DEFAULT_STATE}>
      <StoreSync>{element}</StoreSync>
    </StoreProvider>
  )
}

export default withStorage
