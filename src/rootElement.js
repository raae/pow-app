import React from "react"
import { Provider, useDispatch, useSelector } from "react-redux"
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"

import { reducer as appReducer, name as appSliceName } from "./features/app"

import {
  reducer as authReducer,
  name as authSliceName,
  init as authInit,
  selectUserId,
} from "./features/auth"

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
    [databaseSliceName]: databaseReducer,
  }),
})

const Init = () => {
  const dispatch = useDispatch()
  const userId = useSelector(selectUserId)

  useEffect(() => {
    dispatch(authInit())
  }, [dispatch])

  useEffect(() => {
    if (userId) {
      dispatch(initSettings)
      dispatch(initEntries)
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
