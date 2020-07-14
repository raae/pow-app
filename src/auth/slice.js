import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit"
import userbase from "userbase-js"

import { USERBASE_APP_ID } from "../constants"

export const AUTH_STATUS = {
  INITIAL: "[Auth] Initial",
  INITIALIZING: "[Auth] Initializing",
  AUTHENTICATING: "[Auth] Authenticating",
  UPDATING: "[Auth] Updating",
  IDLE: "[Auth] Idle",
  ERROR: "[Auth] Error",
}

const AUTH_PENDING_STATUSES = [
  AUTH_STATUS.INITIAL,
  AUTH_STATUS.INITIALIZING,
  AUTH_STATUS.AUTHENTICATING,
]

const USER_UPDATING_STATUSES = [AUTH_STATUS.UPDATING]

export const defaultState = {
  user: null,
  status: AUTH_STATUS.INITIAL,
  error: null,
}

export const init = createAsyncThunk("init", async () => {
  const response = await userbase.init({ appId: USERBASE_APP_ID })
  return { user: response.user }
})

export const updateUser = createAsyncThunk("user/update", async (payload) => {
  await userbase.updateUser(payload)
  return { user: payload }
})

const auth = createAsyncThunk("auth", async (payload) => {
  if (!["signIn", "signUp", "signOut"].includes(payload.func)) {
    throw new Error(`Auth func not supported: ${payload.func}`)
  }
  const user = await userbase[payload.func](payload)
  return { user }
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

const rejectedReducer = (state, { error }) => {
  state.status = AUTH_STATUS.ERROR
  state.error = error
}

const authSlice = createSlice({
  name: "auth",
  initialState: defaultState,
  reducers: {},
  extraReducers: {
    [init.pending]: (state) => {
      state.status = AUTH_STATUS.INITIALIZING
    },
    [init.fulfilled]: (state, { payload }) => {
      state.status = AUTH_STATUS.IDLE
      state.user = payload.user
      if (state.user) {
        // To hide them from redux dev tools etc.
        delete state.user.authToken
      }
    },
    [init.rejected]: rejectedReducer,
    [auth.pending]: (state) => {
      state.status = AUTH_STATUS.AUTHENTICATING
      state.error = null
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
    [auth.rejected]: rejectedReducer,
    [updateUser.pending]: (state) => {
      state.status = AUTH_STATUS.UPDATING
      state.error = null
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.status = AUTH_STATUS.IDLE
      state.user = {
        ...state.user,
        ...payload.user,
      }
    },
    [updateUser.rejected]: rejectedReducer,
  },
})

const selectAuthSlice = (state) => state[authSlice.name]

export const selectAuthUser = (state) => selectAuthSlice(state).user
export const selectAuthStatus = (state) => selectAuthSlice(state).status
export const selectAuthError = (state) => selectAuthSlice(state).error

export const selectUserId = createSelector([selectAuthUser], (user) => {
  const userId = user && user.userId
  return userId
})

export const selectIsPayingUser = createSelector([selectAuthUser], (user) => {
  const customerId =
    user && user.protectedProfile && user.protectedProfile.stripeCustomerId
  return Boolean(customerId)
})

export const selectAuthIsPending = createSelector(
  [selectAuthStatus],
  (status) => {
    return AUTH_PENDING_STATUSES.includes(status)
  }
)

export const selectUserIsUpdating = createSelector(
  [selectAuthStatus],
  (status) => {
    return USER_UPDATING_STATUSES.includes(status)
  }
)

export const name = authSlice.name
export default authSlice.reducer
