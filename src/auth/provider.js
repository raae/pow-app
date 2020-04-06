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
    console.log("User signup")
    dispatch({ type: "signUp" })
    return userbase
      .signUp(params)
      .then((user) => {
        console.log("User signup fulfilled")
        dispatch({ type: "signUpFulfilled", user })
        if (redirect && redirects.signUp) {
          navigate(redirects.signUp)
        }
        return user
      })
      .catch((error) => {
        console.warn("User signup failed", error.message)
        dispatch({ type: "signUpFailed", error })
        return { error }
      })
  }

  const signIn = async (params, { redirect = true } = {}) => {
    console.log("User signin")
    dispatch({ type: "signIn" })
    return userbase
      .signIn(params)
      .then((user) => {
        console.log("User signin fulfilled")
        dispatch({ type: "signInFulfilled", user })
        if (redirect && redirects.signIn) {
          navigate(redirects.signIn)
        }
        return user
      })
      .catch((error) => {
        console.warn("User signin failed", error.message)
        dispatch({ type: "signInFailed", error })
        return { error }
      })
  }

  const signOut = ({ redirect = true } = {}) => {
    console.log("User signout")
    dispatch({ type: "signOut" })
    return userbase
      .signOut()
      .then(() => {
        console.log("User signout fulfilled")
        dispatch({ type: "signOutFulfilled", user: null })
        if (redirect && redirects.signOut) {
          navigate(redirects.signOut)
        }
        return true
      })
      .catch((error) => {
        console.warn("User signout failed", error.message)
        dispatch({ type: "signOutFailed", error })
        return { error }
      })
  }

  const updateUser = (params) => {
    console.log("User update")
    dispatch({ type: "updateUser", user: params })
    return userbase
      .updateUser(params)
      .then(() => {
        console.log("User update fulfilled")
        dispatch({ type: "updateUserFulfilled" })
        return true
      })
      .catch((error) => {
        console.warn("User update failed", error.message)
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
