import React, { createContext, useState, useMemo, useContext } from "react"

const makeStore = () => {
  // Make a context for the store
  const context = createContext()

  // Make a provider that takes an initialValue
  const Provider = ({ initialValue = {}, children }) => {
    // Make a new state instance (could even use immer here!)
    const [state, setState] = useState(initialValue)

    // Memoize the context value to update when the state does
    const contextValue = useMemo(() => [state, setState], [state])

    // Provide the store to children
    return <context.Provider value={contextValue}>{children}</context.Provider>
  }

  // A hook to help consume the store
  const useStore = () => useContext(context)

  return [Provider, useStore]
}

export default makeStore
