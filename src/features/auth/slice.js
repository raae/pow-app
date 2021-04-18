import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import userbase from "userbase-js"

import { USERBASE_APP_ID, SESSION_LENGTH } from "../../constants"
import { useSelector } from "react-redux"

export const AUTH_STATUS = {
  PENDING: "[Auth] Pending",
  AUTHENTICATED: "[Auth] Authenticated",
  UNAUTHENTICATED: "[Auth] Unauthenticated",
  FAILED: "[Auth] Failed",
}

export const defaultState = {
  status: AUTH_STATUS.PENDING,
  lastUsedUsername: null,
  error: null,
}

const dispatchUserUpdated = (thunkAPI, { user, args }) => {
  // Will be dealt with in the user slice
  console.log("user", user)
  thunkAPI.dispatch({
    type: "user/updated",
    payload: { user },
    meta: { args },
  })
}

const auth = createAsyncThunk("auth", async (thunkArgs, thunkAPI) => {
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

  console.log("TEST", response)

  if (func === "init") {
    return { ...response }
  } else {
    return { user: response }
  }
})

export const signUp = (payload) => {
  return auth({ func: "signUp", ...payload })
}

export const signIn = (payload) => {
  return auth({ func: "signIn", ...payload })
}

export const signOut = (payload) => {
  return auth({ func: "signOut", ...payload })
}

export const init = () => {
  return auth({ func: "init" })
}

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
      } else {
        state.status = AUTH_STATUS.UNAUTHENTICATED
      }
    },
    [auth.rejected]: (state, { error }) => {
      state.error = error
      state.status = AUTH_STATUS.FAILED
    },
  },
})

const selectAuthSlice = (state) => state[authSlice.name]

export const useAuth = () => {
  const { status, error } = useSelector(selectAuthSlice)
  return {
    error,
    isAuthPending: status === AUTH_STATUS.PENDING,
    isAuthenticated: status === AUTH_STATUS.AUTHENTICATED,
    isUnauthenticated: status === AUTH_STATUS.UNAUTHENTICATED,
  }
}

export const name = authSlice.name
export default authSlice.reducer
