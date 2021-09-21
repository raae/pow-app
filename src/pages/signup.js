import React from "react"
import { AppAuthLayout } from "../features/app"
import { Onboarding } from "../features/onboarding"

const LoginPage = () => {
  return (
    <AppAuthLayout title="Signup" maxWidth="sm">
      <Onboarding />
    </AppAuthLayout>
  )
}

export default LoginPage
