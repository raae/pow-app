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
  initSettings,
  reducer as settingsReducer,
  name as settingsSliceName,
} from "./features/settings"
import {
  initEntries,
  reducer as entriesReducer,
  name as entriesSliceName,
} from "./features/entries"

import { withTheme } from "./theme"

const store = configureStore({
  reducer: combineReducers({
    [appSliceName]: appReducer,
    [authSliceName]: authReducer,
    [userSliceName]: userReducer,
    [entriesSliceName]: entriesReducer,
    [settingsSliceName]: settingsReducer,
  }),
})

const InitStore = () => {
  const dispatch = useDispatch()
  const { userId, init } = useAuth()

  useEffect(() => {
    init()
  }, [init])

  useEffect(() => {
    if (userId) {
      dispatch(initSettings())
      dispatch(initEntries())
    }
  }, [dispatch, userId])

  return null
}

export const Root = ({ children }) => {
  return (
    <Provider store={store}>
      <InitStore />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {children}
      </MuiPickersUtilsProvider>
    </Provider>
  )
}

export const Page = ({ children }) => {
  return withTheme({
    element: <AuthGateway>{children}</AuthGateway>,
  })
}
