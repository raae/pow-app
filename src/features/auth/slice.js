import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit"
import userbase from "userbase-js"

import { USERBASE_APP_ID, SESSION_LENGTH } from "../../constants"
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

export const init = createAsyncThunk("init", async (arg, thunkAPI) => {
  const { user } = await userbase.init({
    appId: USERBASE_APP_ID,
    sessionLength: SESSION_LENGTH,
    updateUserHandler: ({ user }) => {
      thunkAPI.dispatch({
        type: "user/changed",
        payload: { user },
        meta: { arg },
      })
    },
  })

  return { user }
})

export const updateUser = createAsyncThunk("user/update", async (payload) => {
  await userbase.updateUser(payload)
})

const auth = createAsyncThunk("auth", async (payload) => {
  if (!["signIn", "signUp", "signOut"].includes(payload.func)) {
    throw new Error(`Auth func not supported: ${payload.func}`)
  }
  const user = await userbase[payload.func]({
    ...payload,
    sessionLength: SESSION_LENGTH,
  })
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
    "user/changed": fulfilledReducer,
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
    [updateUser.fulfilled]: (state) => {
      state.status = AUTH_STATUS.IDLE
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

export const selectHasActiveSubscription = createSelector(
  [selectAuthUser],
  (user) => {
    return Boolean(user && user.subscriptionStatus === "active")
  }
)

export const selectIsPayingUser = createSelector(
  [selectProtectedProfile, selectHasActiveSubscription],
  (protectedProfile, hasActiveSubscription) => {
    // Old way of doing it
    const customerId = protectedProfile.stripeCustomerId
    // New way of doing it
    return Boolean(customerId || hasActiveSubscription)
  }
)

export const selectCancelSubscriptionAt = createSelector(
  [selectAuthUser],
  (user) => {
    return user && user.cancelSubscriptionAt
  }
)

export const selectSubscriptionPlanId = createSelector(
  [selectProtectedProfile, selectAuthUser],
  (protectedProfile, user) => {
    const subscriptionPlanId = user && user.subscriptionPlanId
    return protectedProfile.stripePlanId || subscriptionPlanId
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
