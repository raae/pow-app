import { useContext } from "react"

import AuthProvider, { AuthStateContext, AuthActionsContext } from "./provider"

export const useAuthState = () => {
  const context = useContext(AuthStateContext)
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider")
  }
  return context
}

export const useAuthActions = () => {
  const context = useContext(AuthActionsContext)
  if (context === undefined) {
    throw new Error("useAuthActions must be used within a AuthProvider")
  }
  return context
}

export default AuthProvider
