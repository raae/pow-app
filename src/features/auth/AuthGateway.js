import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { SIGN_IN, SIGN_UP, HOME } from "../navigation"

import { useAuth } from "./useAuth"

const UNAUTHENTICATED_PATHS = [SIGN_IN.to, "/reset/"]

// Gatsby normalized every URL to a trailing slash; react-router serves
// /login and /login/ alike, so compare with the slash stripped.
const normalize = (path) => path.replace(/\/+$/, "") || "/"

const matches = (paths, pathname) =>
  paths.some((path) => normalize(path) === normalize(pathname))

export const AuthGateway = ({ children }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isUnauthenticated, isAuthenticated } = useAuth()

  useEffect(() => {
    if (
      isUnauthenticated &&
      !matches([...UNAUTHENTICATED_PATHS, SIGN_UP.to], pathname)
    ) {
      navigate(SIGN_IN.to)
    } else if (isAuthenticated && matches(UNAUTHENTICATED_PATHS, pathname)) {
      navigate(HOME.to)
    }
  }, [isUnauthenticated, isAuthenticated, pathname, navigate])

  return children
}
