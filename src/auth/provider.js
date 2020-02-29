import React, { useEffect, createContext, useReducer } from "react"
import userbase from "userbase-js"

import reducer, { defaultState } from "./reducer"

export const AuthStateContext = createContext()
export const AuthActionsContext = createContext()

const AuthProvider = ({ children, appId }) => {
  const [state, dispatch] = useReducer(reducer, defaultState)

  useEffect(() => {
    dispatch({ type: "init" })
    userbase
      .init({ appId })
      .then(({ user, lastUsedUsername }) => {
        dispatch({ type: "initFulfilled", user, lastUsedUsername })
      })
      .catch((error) => {
        dispatch({ type: "initFailed", error })
      })
  }, [appId])

  const signUp = async (params) => {
    dispatch({ type: "signUp" })
    return userbase
      .signUp(params)
      .then((user) => {
        dispatch({ type: "signUpFulfilled", user })
        return user
      })
      .catch((error) => {
        dispatch({ type: "signUpFailed", error })
        return { error }
      })
  }

  const signIn = async (params) => {
    dispatch({ type: "signIn" })
    return userbase
      .signIn(params)
      .then((user) => {
        dispatch({ type: "signInFulfilled", user })
        return user
      })
      .catch((error) => {
        dispatch({ type: "signInFailed", error })
        return { error }
      })
  }

  const signOut = (params) => {
    dispatch({ type: "signOut" })
    return userbase
      .signOut(params)
      .then(() => {
        dispatch({ type: "signOutFulfilled", user: null })
        return true
      })
      .catch((error) => {
        dispatch({ type: "signOutFailed", error })
        return { error }
      })
  }

  const updateUser = (params) => {
    dispatch({ type: "updateUser" })
    return userbase
      .updateUser(params)
      .then(() => {
        dispatch({ type: "updateUserFulfilled", user: null })
        return true
      })
      .catch((error) => {
        dispatch({ type: "updateUserFailed", error })
        return { error }
      })
  }

  const actions = React.useMemo(
    () => ({
      signUp,
      signIn,
      signOut,
      updateUser,
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
