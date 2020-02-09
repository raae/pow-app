import React from "react"
import { navigate } from "gatsby"
import { Router } from "@reach/router"

import Home from "../routes/Home"
import Settings from "../routes/Settings"
import Onboarding from "../routes/Onboarding"
import PrivateRoute from "../routes/PrivateRoute"

const NotFound = () => {
  navigate("/app")
  return null
}

const App = () => (
  <Router basepath="/app">
    <PrivateRoute path="/" component={Home} />
    <PrivateRoute path="/settings" component={Settings} />
    <PrivateRoute path="/onboarding/*" component={Onboarding} />
    <NotFound default />
  </Router>
)

export default App
