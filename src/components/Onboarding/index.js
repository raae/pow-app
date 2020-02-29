import React from "react"

import { useAuthState } from "../../auth"
import { DataProvider } from "../../database"

import Onboarding from "./Onboarding"

const WrappedOnboarding = (props) => {
  const { user } = useAuthState()
  return (
    <DataProvider user={user}>
      <Onboarding {...props} />
    </DataProvider>
  )
}

export default WrappedOnboarding
