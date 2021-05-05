import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit"
import userbase from "userbase-js"

export const USER_STATUS = {
  UPDATING: "[User] Updating",
  IDLE: "[User] Idle",
}

const DEFAULT_PROFILE = {
  newsletter: "-1",
  welcomeCompleted: "-1",
}

export const DEFAULT_STATE = {
  status: USER_STATUS.IDLE,
  user: null,
  error: null,
}

export const updateUser = createAsyncThunk(
  "user/update",
  async (args, thunkAPI) => {
    const state = thunkAPI.getState()
    const { user } = selectUserState(state)

    await userbase.updateUser({
      ...args,
      // Merge new profile data with old profile data,
      // so we do have to do this everywhere we update the user
      profile: { ...user?.profile, ...args.profile },
    })
  }
)

const userSlice = createSlice({
  name: "user",
  initialState: DEFAULT_STATE,
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

export const selectUserState = createSelector([selectUserSlice], (slice) => {
  const { user, status, ...state } = slice

  return {
    ...state,
    user: {
      ...user,
      profile: {
        ...DEFAULT_PROFILE,
        ...user?.profile,
      },
    },
    isUpdating: status === USER_STATUS.UPDATING,
  }
})

export const name = userSlice.name
export default userSlice.reducer
