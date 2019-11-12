import React from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import useBlockstack from "../store/useBlockstack"

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [{ isPending, user }] = useBlockstack()

  if (!user && !isPending) {
    navigate("/")
  }

  if (!user) {
    return null
  }

  return <Component {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
}

export default PrivateRoute
