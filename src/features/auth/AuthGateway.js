import { useEffect } from "react"
import PropTypes from "prop-types"
import { navigate, useLocation } from "@reach/router"
import { SIGN_IN, SIGN_UP, HOME } from "../navigation"

import { useAuth } from "./useAuth"

const UNAUTHENTICATED_PATHS = [SIGN_IN.to, SIGN_UP.to]

export const AuthGateway = ({ unauthenticatedPaths, children }) => {
  const { pathname } = useLocation()
  const { isUnauthenticated, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isUnauthenticated && !unauthenticatedPaths.includes(pathname)) {
      navigate(SIGN_IN.to)
    } else if (isAuthenticated && [SIGN_IN.to].includes(pathname)) {
      // TODO: Change to unauthenticatedPaths.includes
      // when onboarding is refactored
      navigate(HOME.to)
    }
  }, [isUnauthenticated, isAuthenticated, pathname, unauthenticatedPaths])

  return children
}

AuthGateway.propTypes = {
  unauthenticatedPaths: PropTypes.arrayOf(PropTypes.string).isRequired,
}

AuthGateway.defaultProps = {
  unauthenticatedPaths: UNAUTHENTICATED_PATHS,
}
