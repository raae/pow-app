import { navigate } from "gatsby"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "@reach/router"

import { selectAuthState } from "./slice"
import { SIGN_IN } from "../navigation"

export const useAuth = () => {
  const state = useSelector(selectAuthState)
  const { pathname } = useLocation()
  const { isUnauthenticated } = state

  useEffect(() => {
    if (isUnauthenticated && pathname !== SIGN_IN.to) {
      navigate(SIGN_IN.to)
    }
  }, [isUnauthenticated, pathname])

  return {
    ...state,
  }
}
