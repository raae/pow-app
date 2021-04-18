import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit"
import userbase from "userbase-js"

import { useSelector } from "react-redux"

export const USER_STATUS = {
  UPDATING: "[User] Updating",
  IDLE: "[User] Idle",
}

const defaultProfile = {
  newsletter: "0",
  welcomeCompleted: "0",
}

export const defaultState = {
  status: USER_STATUS.IDLE,
  user: null,
  error: null,
}

export const updateUser = createAsyncThunk("user/update", async (payload) => {
  await userbase.updateUser(payload)
})

const userSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {},
  extraReducers: {
    "user/updated": (state, { payload: { user } }) => {
      state.user = user
    },
    "auth/fulfilled": (state, { payload: { user } }) => {
      state.user = user
    },
    [updateUser.pending]: (state) => {
      state.error = null
      state.status = USER_STATUS.UPDATING
    },
    [updateUser.fulfilled]: (state) => {
      state.error = null
      state.status = USER_STATUS.IDLE
    },
    [updateUser.rejected]: (state, { error }) => {
      state.error = error
      state.status = USER_STATUS.IDLE
    },
  },
})

const selectUserSlice = (state) => state[userSlice.name]

const selectUser = createSelector([selectUserSlice], ({ user }) => {
  if (!user) return defaultState.user

  return { ...user, profile: user.profile || defaultProfile }
})

export const useUser = () => {
  const { error, status } = useSelector(selectUserSlice)
  const user = useSelector(selectUser)

  return {
    user,
    error,
    isUpdating: status === USER_STATUS.UPDATING,
  }
}

export const useSubscription = () => {
  const UPDATABLE_STATUSES = ["incomplete", "active", "past_due"]
  const user = useSelector(selectUser)

  if (!user) {
    return {
      isSubscribed: false,
      isSubscriptionUpdatable: false,
      cancelSubscriptionAt: undefined,
      subscriptionPlanId: undefined,
    }
  } else {
    return {
      isSubscribed: user.subscriptionStatus === "active",
      isSubscriptionUpdatable: UPDATABLE_STATUSES.includes(
        user.subscriptionStatus
      ),
      cancelSubscriptionAt: user.cancelSubscriptionAt,
      subscriptionPlanId: user.subscriptionPlanId,
    }
  }
}

export const name = userSlice.name
export default userSlice.reducer
