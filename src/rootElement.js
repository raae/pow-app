import React from "react"

import { USERBASE_APP_ID, DATABASES } from "./constants"

import DataProvider from "./database"
import AuthProvider from "./auth"

export const RootElement = ({ children }) => {
  return (
    <AuthProvider
      appId={USERBASE_APP_ID}
      redirects={{ signIn: "/day", signUp: "/day", signOut: "/login" }}
    >
      <DataProvider databases={DATABASES}>{children}</DataProvider>
    </AuthProvider>
  )
}

export const withRoot = ({ element }) => {
  return <RootElement>{element}</RootElement>
}
