import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import userbase from "userbase-js"

import { USERBASE_APP_ID } from "../constants"

export const AUTH_STATUS = {
  INITIAL: "[Auth] Initial",
  PENDING: "[Auth] Pending",
  IDLE: "[Auth] Idle",
}

export const defaultState = {
  user: null,
  status: AUTH_STATUS.INITIAL,
  error: null,
}

const auth = createAsyncThunk("auth", async (payload) => {
  let user = null

  if (payload.func === "init") {
    const response = await userbase.init({ appId: payload.appId })
    user = response.user
  } else {
    user = await userbase[payload.func](payload)
  }

  return { user }
})

export const init = () => {
  const payload = {
    appId: USERBASE_APP_ID,
  }
  return auth({ func: "init", ...payload })
}

export const signUp = (payload) => {
  return auth({ func: "signUp", ...payload })
}

export const signIn = (payload) => {
  return auth({ func: "signIn", ...payload })
}

export const signOut = (payload) => {
  return auth({ func: "signOut", ...payload })
}

export const updateUser = (payload) => {
  return auth({ func: "updateUser", ...payload })
}

const authSlice = createSlice({
  name: "auth",
  initialState: defaultState,
  reducers: {},
  extraReducers: {
    [auth.pending]: (state) => {
      state.status = AUTH_STATUS.PENDING
    },
    [auth.fulfilled]: (state, { payload }) => {
      state.status = AUTH_STATUS.IDLE
      state.user = payload.user
      if (state.user) {
        // To hide them from redux dev tools etc.
        delete state.user.authToken
        delete state.user.userId
      }
    },
    [auth.failed]: (state, { payload }) => {
      state.status = AUTH_STATUS.IDLE
      state.error = payload.error
    },
  },
})

export const name = authSlice.name

export default authSlice.reducer
