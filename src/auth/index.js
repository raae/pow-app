import React, { useContext } from "react"

import AuthProvider, { AuthStateContext, AuthActionsContext } from "./provider"

const useAuthState = () => {
  const context = useContext(AuthStateContext)
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider")
  }
  return context
}

const useAuthActions = () => {
  const context = useContext(AuthActionsContext)
  if (context === undefined) {
    throw new Error("useAuthActions must be used within a AuthProvider")
  }
  return context
}

const withAuthProvider = ({ element }) => {
  return <AuthProvider>{element}</AuthProvider>
}

export { withAuthProvider, useAuthState, useAuthActions }
