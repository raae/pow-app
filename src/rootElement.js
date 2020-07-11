import React from "react"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"

import { Provider, useDispatch } from "react-redux"
import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import authReducer, { name as authName, init as authInit } from "./auth/slice"

import { DATABASES } from "./constants"

import DataProvider from "./database"
import { useEffect } from "react"

const store = configureStore({
  reducer: combineReducers({
    [authName]: authReducer,
  }),
})

const Init = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(authInit())
  }, [dispatch])

  return null
}

export const RootElement = ({ children }) => {
  return (
    <Provider store={store}>
      <Init />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DataProvider databases={DATABASES}>{children}</DataProvider>
      </MuiPickersUtilsProvider>
    </Provider>
  )
}

export const withRoot = ({ element }) => {
  return <RootElement>{element}</RootElement>
}
