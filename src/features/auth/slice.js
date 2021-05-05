import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit"
import userbase from "userbase-js"

import { USERBASE_APP_ID, SESSION_LENGTH } from "../../constants"

export const AUTH_STATUS = {
  PENDING: "[Auth] Pending",
  AUTHENTICATED: "[Auth] Authenticated",
  UNAUTHENTICATED: "[Auth] Unauthenticated",
  FAILED: "[Auth] Failed",
}

export const defaultState = {
  status: AUTH_STATUS.PENDING,
  userId: null,
  lastUsedUsername: null,
  error: null,
}

const dispatchUserUpdated = (thunkAPI, { user, args }) => {
  // Will be dealt with in the user slice
  thunkAPI.dispatch({
    type: "user/updated",
    payload: { user },
    meta: { args },
  })
}

export const auth = createAsyncThunk("auth", async (thunkArgs, thunkAPI) => {
  const { func, ...args } = thunkArgs
  if (!["signIn", "signUp", "signOut", "init"].includes(func)) {
    throw new Error(`Auth func not supported: ${args.func}`)
  }

  const initArgs = {
    appId: USERBASE_APP_ID,
    updateUserHandler: ({ user }) => {
      dispatchUserUpdated(thunkAPI, { user, args: thunkArgs })
    },
  }

  const response = await userbase[func]({
    ...args,
    sessionLength: SESSION_LENGTH,
    ...(func === "init" && initArgs),
  })

  if (func === "init") {
    return { ...response }
  } else {
    return { user: response }
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: defaultState,
  reducers: {},
  extraReducers: {
    [auth.pending]: (state) => {
      state.error = null
      state.status = AUTH_STATUS.PENDING
    },
    [auth.fulfilled]: (state, { payload: { lastUsedUsername, user } }) => {
      state.error = null
      state.lastUsedUsername = lastUsedUsername

      if (user) {
        state.status = AUTH_STATUS.AUTHENTICATED
        state.userId = user.userId
      } else {
        state.status = AUTH_STATUS.UNAUTHENTICATED
        state.userId = null
      }
    },
    [auth.rejected]: (state, { error }) => {
      state.error = error
      state.status = AUTH_STATUS.FAILED
    },
  },
})

const selectAuthSlice = (state) => state[authSlice.name]

export const selectAuthState = createSelector([selectAuthSlice], (slice) => {
  const { status, ...state } = slice
  return {
    ...state,
    isAuthPending: status === AUTH_STATUS.PENDING,
    isAuthenticated: status === AUTH_STATUS.AUTHENTICATED,
    isUnauthenticated: status === AUTH_STATUS.UNAUTHENTICATED,
    isAuthFailed: status === AUTH_STATUS.FAILED,
  }
})

export const name = authSlice.name
export default authSlice.reducer
