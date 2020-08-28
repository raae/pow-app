import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit"
import userbase from "userbase-js"

import { USERBASE_APP_ID } from "../../constants"
import { last } from "lodash"

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

const AUTH_FAILED_STATUSES = [AUTH_STATUS.ERROR]

const USER_UPDATING_STATUSES = [AUTH_STATUS.UPDATING]

const defaultProfile = {
  newsletter: "0",
  welcomeCompleted: "0",
}

const defaultProtectedProfile = {
  stripeEmail: "",
  stripeCustomerId: "",
  stripePlanId: "",
}

export const defaultState = {
  user: null,
  status: AUTH_STATUS.INITIAL,
  errors: [],
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
  state.errors.unshift(error)
  if (state.errors.length > 10) {
    state.errors.pop()
  }
}

const fulfilledReducer = (state, { payload }) => {
  state.status = AUTH_STATUS.IDLE
  state.user = payload.user
  if (state.user) {
    // To hide them from redux dev tools etc.
    delete state.user.authToken
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState: defaultState,
  reducers: {},
  extraReducers: {
    [init.pending]: (state) => {
      state.status = AUTH_STATUS.INITIALIZING
    },
    [init.fulfilled]: fulfilledReducer,
    [init.rejected]: rejectedReducer,
    [auth.pending]: (state) => {
      state.status = AUTH_STATUS.AUTHENTICATING
    },
    [auth.fulfilled]: fulfilledReducer,
    [auth.rejected]: rejectedReducer,
    [updateUser.pending]: (state) => {
      state.status = AUTH_STATUS.UPDATING
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      // userbase.updateUser does not return the user
      // so we must merge in the payload of changed fulfilled
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

const selectAuthUser = createSelector([selectAuthSlice], (slice) => {
  return slice.user
})
const selectAuthStatus = createSelector([selectAuthSlice], (slice) => {
  return slice.status
})
const selectAuthErrors = createSelector([selectAuthSlice], (slice) => {
  return slice.errors
})
const selectProtectedProfile = createSelector([selectAuthUser], (user) => {
  return user && user.protectedProfile
    ? user.protectedProfile
    : defaultProtectedProfile
})

export const selectIsAuthenticated = createSelector(
  [selectAuthUser],
  (user) => {
    return !!user
  }
)

export const selectUserId = createSelector([selectAuthUser], (user) => {
  return user && user.userId
})

export const selectUsername = createSelector([selectAuthUser], (user) => {
  return user && user.username
})

export const selectProfile = createSelector([selectAuthUser], (user) => {
  return user && user.profile ? user.profile : defaultProfile
})

export const selectUserEmail = createSelector(
  [selectAuthUser, selectProtectedProfile],
  (user, protectedProfile) => {
    const userEmail = user && user.email
    const stripeEmail = protectedProfile.stripeEmail
    return userEmail || stripeEmail
  }
)

export const selectIsPayingUser = createSelector(
  [selectProtectedProfile],
  (protectedProfile) => {
    const customerId = protectedProfile.stripeCustomerId
    return Boolean(customerId)
  }
)

export const selectStripePlan = createSelector(
  [selectProtectedProfile],
  (protectedProfile) => {
    return protectedProfile.stripePlanId.split("_")[0]
  }
)

export const selectUserIsUpdating = createSelector(
  [selectAuthStatus],
  (status) => {
    return USER_UPDATING_STATUSES.includes(status)
  }
)

export const selectAuthIsPending = createSelector(
  [selectAuthStatus],
  (status) => {
    return AUTH_PENDING_STATUSES.includes(status)
  }
)

export const selectAuthIsFailed = createSelector(
  [selectAuthStatus],
  (status) => {
    return AUTH_FAILED_STATUSES.includes(status)
  }
)

export const selectAuthError = createSelector(
  [selectAuthIsFailed, selectAuthErrors],
  (authIsFailed, errors) => {
    return authIsFailed && last(errors)
  }
)

export const name = authSlice.name
export default authSlice.reducer
