import React from "react"
import { AppAuthLayout } from "../features/app"
import { SignInForm } from "../features/auth"

const LoginPage = () => {
  return (
    <AppAuthLayout title="Login">
      <SignInForm />
    </AppAuthLayout>
  )
}

export default LoginPage
