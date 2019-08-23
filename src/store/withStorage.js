import React from "react"
import { StoreProvider } from "./store.js"
import syncEntries from "../store/syncEntries"

const StoreSync = ({ children }) => {
  syncEntries()
  return children
}

const withStorage = ({ element, isSSR }) => {
  return (
    <StoreProvider>
      <StoreSync>{element}</StoreSync>
    </StoreProvider>
  )
}

export default withStorage
