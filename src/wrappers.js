import React, { useEffect } from "react"
import { Provider, useDispatch } from "react-redux"
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"

import { reducer as appReducer, name as appSliceName } from "./features/app"

import {
  reducer as authReducer,
  name as authSliceName,
  useAuth,
  AuthGateway,
} from "./features/auth"

import { reducer as userReducer, name as userSliceName } from "./features/user"

import {
  reducer as databaseReducer,
  name as databaseSliceName,
} from "./features/database"

import { initSettings } from "./features/settings"
import { initEntries } from "./features/entries"

import { withTheme } from "./theme"

const store = configureStore({
  reducer: combineReducers({
    [appSliceName]: appReducer,
    [authSliceName]: authReducer,
    [userSliceName]: userReducer,
    [databaseSliceName]: databaseReducer,
  }),
})

const InitStore = ({ isSSR }) => {
  const dispatch = useDispatch()
  const { userId, init } = useAuth()

  useEffect(() => {
    if (!isSSR) {
      init()
    }
  }, [isSSR, init])

  useEffect(() => {
    if (userId) {
      dispatch(initSettings())
      dispatch(initEntries())
    }
  }, [dispatch, userId])

  return null
}

const RootElement = ({ children }) => {
  return (
    <Provider store={store}>
      <InitStore />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {children}
      </MuiPickersUtilsProvider>
    </Provider>
  )
}

export const withPage = ({ element }) => {
  return withTheme({
    element: <AuthGateway> {element}</AuthGateway>,
  })
}

export const withRoot = ({ element, isSSR }) => {
  return <RootElement isSSR={isSSR}>{element}</RootElement>
}
