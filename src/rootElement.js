import React from "react"
import { Provider, useDispatch } from "react-redux"
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"

import { reducer as appReducer, name as appSliceName } from "./features/app"

import {
  reducer as authReducer,
  name as authSliceName,
  init as authInit,
} from "./features/auth"

import {
  reducer as userReducer,
  name as userSliceName,
  useUser,
} from "./features/user"

import {
  reducer as databaseReducer,
  name as databaseSliceName,
} from "./features/database"

import { initSettings } from "./features/settings"
import { initEntries } from "./features/entries"

import { useEffect } from "react"

const store = configureStore({
  reducer: combineReducers({
    [appSliceName]: appReducer,
    [authSliceName]: authReducer,
    [userSliceName]: userReducer,
    [databaseSliceName]: databaseReducer,
  }),
})

const Init = () => {
  const dispatch = useDispatch()
  const { user } = useUser()
  const userId = user?.userId

  useEffect(() => {
    dispatch(authInit())
  }, [dispatch])

  useEffect(() => {
    if (userId) {
      dispatch(initSettings())
      dispatch(initEntries())
    }
  }, [dispatch, userId])

  return null
}

export const RootElement = ({ children }) => {
  return (
    <Provider store={store}>
      <Init />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {children}
      </MuiPickersUtilsProvider>
    </Provider>
  )
}

export const withRoot = ({ element }) => {
  return <RootElement>{element}</RootElement>
}
