import React, { useEffect } from "react"
import { Provider, useDispatch } from "react-redux"
import { combineReducers } from "redux"
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { combineEpics, createEpicMiddleware } from "redux-observable"

import globalEpics from "./epics"
import authSlice, { epics as authEpics } from "./auth"
import dataSlice, { epics as dataEpics } from "./data"
import logSlice, { epics as logEpics } from "./log"
import cycleSlice, { epics as cycleEpics } from "./cycle"
import settingsSlice, { epics as settingsEpic } from "./settings"

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [dataSlice.name]: dataSlice.reducer,
  [logSlice.name]: logSlice.reducer,
  [settingsSlice.name]: settingsSlice.reducer,
  [cycleSlice.name]: cycleSlice.reducer,
})

const rootEpic = combineEpics(
  ...globalEpics,
  ...authEpics,
  ...dataEpics,
  ...logEpics,
  ...settingsEpic,
  ...cycleEpics
)

const epicMiddleware = createEpicMiddleware()

const customizedMiddleware = getDefaultMiddleware({
  thunk: false,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: [...customizedMiddleware, epicMiddleware],
})

if (typeof window !== `undefined`) {
  epicMiddleware.run(rootEpic)
}

export const Root = ({ children }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: "init" })
  }, [dispatch])
  return <>{children}</>
}

export const withStore = ({ element }) => {
  return (
    <Provider store={store}>
      <Root>{element}</Root>
    </Provider>
  )
}
