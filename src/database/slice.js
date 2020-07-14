import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import userbase from "userbase-js"

export const DATABASE_STATUS = {
  INITIAL: "[Database] Initial",
  OPENING: "[Database] Opening",
  OPENED: "[Database] Opened",
  ERROR: "[Database] Error",
}

export const defaultDatabaseState = {
  items: [],
  status: DATABASE_STATUS.INITIAL,
  error: null,
}

export const defaultState = {
  settings: defaultDatabaseState,
  entries: defaultDatabaseState,
}

const databaseItemAction = createAsyncThunk(
  "database/item",
  async (payload, thunkAPI) => {
    const { databaseName, itemId } = payload
    if (payload.func === "upsert") {
      const items = selectDatabaseItems(thunkAPI.getState(), { databaseName })
      if (items.find((item) => item.itemId === itemId)) {
        payload.func = "update"
      } else {
        payload.func = "insert"
      }
    }

    await userbase[`${payload.func}Item`](payload)
  }
)

export const openDatabase = createAsyncThunk(
  "database/open",
  async (arg, thunkAPI) => {
    const { databaseName } = arg

    await userbase.openDatabase({
      databaseName: databaseName,
      changeHandler: (items) => {
        thunkAPI.dispatch({
          type: "database/changed",
          payload: { items },
          meta: { arg },
        })
      },
    })
  }
)

export const insertItem = (payload) => {
  return databaseItemAction({
    func: "insert",
    ...payload,
  })
}

export const updateItem = (payload) => {
  return databaseItemAction({
    func: "update",
    ...payload,
  })
}

export const upsertItem = (payload) => {
  return databaseItemAction({
    func: "upsert",
    ...payload,
  })
}

const databasesSlice = createSlice({
  name: "databases",
  initialState: defaultState,
  reducers: {},
  extraReducers: {
    "database/changed": (state, { payload, meta }) => {
      const { databaseName } = meta.arg
      const { items } = payload
      state[databaseName].items = items
    },
    [openDatabase.pending]: (state, { meta }) => {
      const { databaseName } = meta.arg
      state[databaseName].status = DATABASE_STATUS.OPENING
      state[databaseName].error = null
    },
    [openDatabase.fulfilled]: (state, { meta }) => {
      const { databaseName } = meta.arg
      state[databaseName].status = DATABASE_STATUS.OPENED
    },
    [openDatabase.rejected]: (state, { error, meta }) => {
      const { databaseName } = meta.arg
      state[databaseName].status = DATABASE_STATUS.ERROR
      state[databaseName].error = error
    },
  },
})

const selectDatabasesSlice = (state) => state[databasesSlice.name]
export const selectDatabaseItems = (state, { databaseName }) => {
  return selectDatabasesSlice(state)[databaseName].items
}
export const selectIsDatabaseInitialized = (state, { databaseName }) => {
  const status = selectDatabasesSlice(state)[databaseName].status
  return status === DATABASE_STATUS.OPENED
}

export const name = databasesSlice.name
export default databasesSlice.reducer
