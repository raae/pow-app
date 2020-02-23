import React, { useEffect, createContext, useReducer } from "react"
import userbase from "userbase-js"

import { reducer, defaultState } from "./reducer"

export const AuthStateContext = createContext()
export const AuthActionsContext = createContext()

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState)

  useEffect(() => {
    dispatch({ type: "init" })
    userbase
      .init({
        appId: process.env.GATSBY_USERBASE_APP_ID,
      })
      .then(({ user, lastUsedUsername }) => {
        dispatch({ type: "initFulfilled", user, lastUsedUsername })
      })
      .catch((error) => {
        dispatch({ type: "initFailed", error })
      })
  }, [])

  const signUp = (params) => {
    dispatch({ type: "signUp" })
    userbase
      .signUp(params)
      .then((user) => {
        dispatch({ type: "signUpFulfilled", user })
      })
      .catch((error) => {
        dispatch({ type: "signUpFailed", error })
      })
  }

  const signIn = (params) => {
    dispatch({ type: "signIn" })
    userbase
      .signIn(params)
      .then((user) => {
        dispatch({ type: "signInFulfilled", user })
      })
      .catch((error) => {
        dispatch({ type: "signInFailed", error })
      })
  }

  const signOut = (params) => {
    dispatch({ type: "signOut" })
    userbase
      .signOut(params)
      .then(() => {
        dispatch({ type: "signOutFulfilled", user: null })
      })
      .catch((error) => {
        dispatch({ type: "signOutFailed", error })
      })
  }

  const actions = React.useMemo(
    () => ({
      signUp,
      signIn,
      signOut,
    }),
    []
  )

  return (
    <AuthStateContext.Provider value={state}>
      <AuthActionsContext.Provider value={actions}>
        {children}
      </AuthActionsContext.Provider>
    </AuthStateContext.Provider>
  )
}

export default AuthProvider
