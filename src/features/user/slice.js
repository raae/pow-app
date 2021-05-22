import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit"
import userbase from "userbase-js"

const SLICE_NAME = "user"

export const STATUS = {
  INITIAL: `[${SLICE_NAME}] Initial`,
  UPDATING: `[${SLICE_NAME}]  Updating`,
  IDLE: `[${SLICE_NAME}] Idle`,
}

const DEFAULT_PROFILE = {
  newsletter: "-1",
  welcomeCompleted: "-1",
}

export const DEFAULT_STATE = {
  status: STATUS.INITIAL,
  user: {
    profile: DEFAULT_PROFILE,
  },
  error: null,
}

export const updateUser = createAsyncThunk(
  "user/update",
  async (args, thunkAPI) => {
    const state = thunkAPI.getState()
    const user = selectUser(state)

    await userbase.updateUser({
      ...args,
      // Merge new profile data with old profile data,
      // so we do have to do this everywhere we update the user
      profile: { ...user?.profile, ...args.profile },
    })
  }
)

const amendUser = (user) => {
  return {
    ...user,
    profile: {
      ...DEFAULT_PROFILE,
      ...user?.profile,
    },
  }
}

const userSlice = createSlice({
  name: SLICE_NAME,
  initialState: DEFAULT_STATE,
  reducers: {},
  extraReducers: {
    "user/updated": (state, { payload: { user } }) => {
      state.user = amendUser(user)
    },
    "auth/fulfilled": (state, { payload: { user } }) => {
      state.user = amendUser(user)
      state.status = STATUS.IDLE
    },
    [updateUser.pending]: (state) => {
      state.error = null
      state.status = STATUS.UPDATING
    },
    [updateUser.fulfilled]: (state) => {
      state.error = null
      state.status = STATUS.IDLE
    },
    [updateUser.rejected]: (state, { error }) => {
      state.error = error
      state.status = STATUS.IDLE
    },
  },
})

const selectUserSlice = (state) => state[userSlice.name]

export const selectStatus = createSelector([selectUserSlice], ({ status }) => {
  return status
})

export const selectUser = createSelector([selectUserSlice], ({ user }) => {
  return user
})

export const name = userSlice.name
export default userSlice.reducer
