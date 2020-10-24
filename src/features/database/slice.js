import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit"
import userbase from "userbase-js"
import { remove } from "lodash"

export const DATABASE_STATUS = {
  INITIAL: "[Database] Initial",
  OPENING: "[Database] Opening",
  OPENED: "[Database] Opened",
  ERROR: "[Database] Error",
}

const DATABASE_LOADING_STATUSES = [
  DATABASE_STATUS.INITIAL,
  DATABASE_STATUS.OPENING,
]

export const defaultDatabaseState = {
  status: DATABASE_STATUS.INITIAL,
  errors: [],
  items: [],
  pendingByItemId: {},
  errorsByItemId: {},
}

export const defaultState = {}

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

export const emptyDatabase = createAsyncThunk(
  "database/empty",
  async (arg, thunkAPI) => {
    const { databaseName } = arg
    const state = thunkAPI.getState()
    const items = selectDatabaseItems(state, { databaseName })

    const operations = items.map(({ itemId }) => {
      return { command: "Delete", itemId }
    })

    await userbase.putTransaction({
      databaseName,
      operations,
    })
  }
)

export const itemAction = createAsyncThunk(
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

export const insertItem = (payload) => {
  return itemAction({
    func: "insert",
    ...payload,
  })
}

export const updateItem = (payload) => {
  return itemAction({
    func: "update",
    ...payload,
  })
}

export const upsertItem = (payload) => {
  return itemAction({
    func: "upsert",
    ...payload,
  })
}

const initDatabaseState = (state, { databaseName }) => {
  if (!state[databaseName]) {
    state[databaseName] = { ...defaultDatabaseState }
  }
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
      initDatabaseState(state, { databaseName })
      state[databaseName].status = DATABASE_STATUS.OPENING
    },
    [openDatabase.fulfilled]: (state, { meta }) => {
      const { databaseName } = meta.arg
      state[databaseName].status = DATABASE_STATUS.OPENED
    },
    [openDatabase.rejected]: (state, { error, meta }) => {
      const { databaseName } = meta.arg
      state[databaseName].status = DATABASE_STATUS.ERROR
      state[databaseName].errors.unshift(error)
      if (state[databaseName].errors.length > 10) {
        state[databaseName].errors.pop()
      }
    },
    [itemAction.pending]: (state, { meta }) => {
      const requestId = meta.requestId
      const { databaseName, itemId, item } = meta.arg

      let pending = state[databaseName].pendingByItemId[itemId]
      if (!pending) {
        pending = []
      }
      pending.unshift({ requestId, itemId, item })
      state[databaseName].pendingByItemId[itemId] = pending
    },
    [itemAction.fulfilled]: (state, { meta }) => {
      const requestId = meta.requestId
      const { databaseName, itemId } = meta.arg

      let pending = state[databaseName].pendingByItemId[itemId]
      remove(pending, (item) => item.requestId === requestId)
      state[databaseName].pendingByItemId[itemId] = pending
    },
    [itemAction.rejected]: (state, { meta, error }) => {
      const requestId = meta.requestId
      const { databaseName, itemId } = meta.arg

      let pending = state[databaseName].pendingByItemId[itemId]
      remove(pending, (item) => item.requestId === requestId)
      state[databaseName].pendingByItemId[itemId] = pending

      let errors = state[databaseName].errorsByItemId[itemId]
      if (!errors) {
        errors = []
      }
      errors.unshift({ requestId, itemId, ...error })
      if (errors.length > 10) {
        errors.pop()
      }
      state[databaseName].errorsByItemId[itemId] = errors
    },
  },
})

const selectDatabasesSlice = (state) => state[databasesSlice.name]
const selectDatabaseName = (state, props) => props.databaseName

const selectDatabaseStatus = createSelector(
  [selectDatabasesSlice, selectDatabaseName],
  (slice, databaseName) => {
    if (slice[databaseName]) {
      return slice[databaseName].status
    } else {
      return DATABASE_STATUS.INITIAL
    }
  }
)

export const selectDatabaseItems = createSelector(
  [selectDatabasesSlice, selectDatabaseName],
  (slice, databaseName) => {
    return slice[databaseName].items
  }
)

export const selectDatabaseError = createSelector(
  [selectDatabasesSlice, selectDatabaseName],
  (slice, databaseName) => {
    return slice[databaseName].error
  }
)

export const selectDatabasePendingItemsById = createSelector(
  [selectDatabasesSlice, selectDatabaseName],
  (slice, databaseName) => {
    return slice[databaseName].pendingByItemId
  }
)

export const selectDatabaseErrorsById = createSelector(
  [selectDatabasesSlice, selectDatabaseName],
  (slice, databaseName) => {
    return slice[databaseName].errors
  }
)

export const selectIsDatabaseLoading = createSelector(
  [selectDatabaseStatus],
  (status) => {
    return DATABASE_LOADING_STATUSES.includes(status)
  }
)

export const name = databasesSlice.name
export default databasesSlice.reducer
