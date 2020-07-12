import React from "react"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"

import { Provider, useDispatch, useSelector } from "react-redux"
import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"

import authReducer, {
  name as authSliceName,
  init as authInit,
  selectAuthUser,
} from "./auth/slice"

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
  const user = useSelector(selectAuthUser)

  useEffect(() => {
    dispatch(authInit())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(initSettings)
      dispatch(initEntries)
    }
  }, [dispatch, user])

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
