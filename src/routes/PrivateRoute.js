import React from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"

import { useSelector } from "react-redux"
import { selectUser, selectAuthIsPending } from "../store/auth"

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isPending = useSelector(selectAuthIsPending)
  const user = useSelector(selectUser)

  if (!user && !isPending) {
    navigate("/")
  }

  return <Component {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
}

export default PrivateRoute
