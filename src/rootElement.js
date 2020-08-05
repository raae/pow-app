import React from "react"
import { Provider, useDispatch, useSelector } from "react-redux"
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"

import {
  reducer as authReducer,
  name as authSliceName,
  init as authInit,
  selectUserId,
} from "./auth"

import databaseReducer, { name as databaseSliceName } from "./database/slice"

import { initSettings } from "./settings/slice"
import { initEntries } from "./entries/slice"

import { useEffect } from "react"

const store = configureStore({
  reducer: combineReducers({
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
