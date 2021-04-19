import { navigate } from "gatsby"
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "@reach/router"

import { selectAuthState, auth } from "./slice"
import { SIGN_IN, SIGN_UP, HOME } from "../navigation"

const unauthenticatedPaths = [SIGN_IN.to, SIGN_UP.to]

export const useAuth = () => {
  const dispatch = useDispatch()
  const state = useSelector(selectAuthState)
  const { pathname } = useLocation()
  const { isUnauthenticated, isAuthenticated } = state

  const handleAuth = useCallback(
    (name) => (payload) => {
      return dispatch(auth({ func: name, ...payload }))
    },
    [dispatch]
  )

  useEffect(() => {
    if (isUnauthenticated && !unauthenticatedPaths.includes(pathname)) {
      navigate(SIGN_IN.to)
    } else if (isAuthenticated && [SIGN_IN.to].includes(pathname)) {
      // TODO: Change to unauthenticatedPaths.includes
      // when onboarding is refactored
      navigate(HOME.to)
    }
  }, [isUnauthenticated, isAuthenticated, pathname])

  return {
    ...state,
    signIn: handleAuth("signIn"),
    signOut: handleAuth("signOut"),
    signUp: handleAuth("signUp"),
  }
}
