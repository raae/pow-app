import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

import { selectAuthState, auth } from "./slice"

export const useAuth = () => {
  const dispatch = useDispatch()
  const state = useSelector(selectAuthState)

  const handleInit = useCallback(() => {
    return dispatch(auth({ func: "init" }))
  }, [dispatch])

  const handleSignOut = useCallback(() => {
    return dispatch(auth({ func: "signOut" }))
  }, [dispatch])

  const handleSignUp = useCallback(
    (payload) => {
      return dispatch(auth({ func: "signUp", ...payload }))
    },
    [dispatch]
  )

  const handleSignIn = useCallback(
    (payload) => {
      return dispatch(auth({ func: "signIn", ...payload }))
    },
    [dispatch]
  )

  return {
    ...state,
    init: handleInit,
    signIn: handleSignIn,
    signOut: handleSignOut,
    signUp: handleSignUp,
  }
}
