import React from "react"

import CycleProvider from "./provider"
import useCycleDayState from "./useCycleDayState"

const withCycleProvider = ({ element }) => {
  return <CycleProvider>{element}</CycleProvider>
}

export { withCycleProvider, CycleProvider, useCycleDayState }
