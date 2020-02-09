import React from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"

import { useSelector } from "react-redux"
import { selectDataIsInitialized } from "../store/data"
import { selectCalculationIsInitialized } from "../store/cycle"
import { selectUser, selectAuthIsPending } from "../store/auth"

import Loading from "../components/Loading"

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(selectUser)
  const isAuthPending = useSelector(selectAuthIsPending)
  const isDataInitialized = useSelector(selectDataIsInitialized)
  const isCalculationInitialized = useSelector(selectCalculationIsInitialized)

  if (!user && !isAuthPending) {
    navigate("/")
    return null
  }

  if (isAuthPending || !isDataInitialized || !isCalculationInitialized) {
    return <Loading />
  }

  return <Component {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
}

export default PrivateRoute
