import React from "react"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"

import { USERBASE_APP_ID, DATABASES } from "./constants"

import DataProvider from "./database"
import AuthProvider from "./auth"

export const RootElement = ({ children }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <AuthProvider
        appId={USERBASE_APP_ID}
        redirects={{ signIn: "/cycle", signUp: "/cycle", signOut: "/login" }}
      >
        <DataProvider databases={DATABASES}>{children}</DataProvider>
      </AuthProvider>
    </MuiPickersUtilsProvider>
  )
}

export const withRoot = ({ element }) => {
  return <RootElement>{element}</RootElement>
}
