import React from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"

import { useSelector } from "react-redux"
import { selectDataIsInitialized } from "../store/data"
import { selectCalculationIsInitialized } from "../store/cycle"
import { selectUser, selectAuthIsPending } from "../store/auth"
import { selectMenstruationTag } from "../store/settings"

import Loading from "../components/Loading"

const PrivateRoute = ({ component: Component, uri, ...rest }) => {
  const user = useSelector(selectUser)
  const isAuthPending = useSelector(selectAuthIsPending)
  const isDataInitialized = useSelector(selectDataIsInitialized)
  const isCalculationInitialized = useSelector(selectCalculationIsInitialized)
  const menstruationTag = useSelector(selectMenstruationTag)

  if (!user && !isAuthPending) {
    navigate("/")
    return null
  }

  if (isAuthPending || !isDataInitialized || !isCalculationInitialized) {
    return <Loading />
  }

  if (!menstruationTag && !uri.includes("onboarding")) {
    navigate("/app/onboarding")
  }

  return <Component {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
}

export default PrivateRoute
