import React, { useEffect, createContext, useReducer } from "react"
import { navigate } from "gatsby"

import userbase from "userbase-js"

import reducer, { defaultState } from "./reducer"

export const AuthStateContext = createContext()
export const AuthActionsContext = createContext()

const AuthProvider = ({ children, appId, redirects = {} }) => {
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

  const signUp = async (params, { redirect = true } = {}) => {
    dispatch({ type: "signUp" })
    return userbase
      .signUp(params)
      .then((user) => {
        dispatch({ type: "signUpFulfilled", user })
        if (redirect && redirects.signUp) {
          navigate(redirects.signUp)
        }
        return user
      })
      .catch((error) => {
        dispatch({ type: "signUpFailed", error })
        return { error }
      })
  }

  const signIn = async (params, { redirect = true } = {}) => {
    dispatch({ type: "signIn" })
    return userbase
      .signIn(params)
      .then((user) => {
        dispatch({ type: "signInFulfilled", user })
        if (redirect && redirects.signIn) {
          navigate(redirects.signIn)
        }
        return user
      })
      .catch((error) => {
        dispatch({ type: "signInFailed", error })
        return { error }
      })
  }

  const signOut = ({ redirect = true } = {}) => {
    dispatch({ type: "signOut" })
    return userbase
      .signOut()
      .then(() => {
        dispatch({ type: "signOutFulfilled", user: null })
        if (redirect && redirects.signOut) {
          navigate(redirects.signOut)
        }
        return true
      })
      .catch((error) => {
        dispatch({ type: "signOutFailed", error })
        return { error }
      })
  }

  const updateUser = (params) => {
    dispatch({ type: "updateUser", user: params })
    return userbase
      .updateUser(params)
      .then(() => {
        dispatch({ type: "updateUserFulfilled" })
        return true
      })
      .catch((error) => {
        dispatch({ type: "updateUserFailed", error })
        return { error }
      })
  }

  const actions = {
    signUp,
    signIn,
    signOut,
    updateUser,
  }

  return (
    <AuthStateContext.Provider value={state}>
      <AuthActionsContext.Provider value={actions}>
        {children}
      </AuthActionsContext.Provider>
    </AuthStateContext.Provider>
  )
}

export default AuthProvider
