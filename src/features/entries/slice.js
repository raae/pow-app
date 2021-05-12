import {
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit"
import userbase from "userbase-js"
import { keyBy, sortBy, uniq, isUndefined, last } from "lodash"

import { selectMensesTagText } from "../settings"

import { makeDate, entryIdFromDate } from "../utils/days"
import { tagsFromText } from "../utils/tags"

const SLICE_NAME = "entries"
const DB_NAME = SLICE_NAME
const DB_ITEM = "entry"

export const DB_STATUS = {
  INITIAL: `[${DB_NAME}] Initial`,
  OPENING: `[${DB_NAME}] Opening`,
  OPENED: `[${DB_NAME}] Opened`,
  FAILED: `[${DB_NAME}] Failed`,
}

// =========================================================
//
//  Adaptor
//
// =========================================================

const entriesAdaptor = createEntityAdapter({
  selectId: (entry) => entry.itemId,
})

const { selectById, selectIds, selectAll } = entriesAdaptor.getSelectors(
  (state) => state[SLICE_NAME]
)

// =========================================================
//
//  Thunks / Actions
//
// =========================================================

export const initEntries = createAsyncThunk(
  `${DB_NAME}/init`,
  async (_, thunkAPI) => {
    await userbase.openDatabase({
      databaseName: DB_NAME,
      changeHandler: (items) => {
        // Anytime there are changes to any entry
        // on the server changeHandler will be called.
        thunkAPI.dispatch({
          type: `${DB_NAME}/changed`,
          payload: { items },
        })
      },
    })
  }
)

export const deleteAllEntries = createAsyncThunk(
  `${DB_NAME}/empty`,
  async (_, thunkAPI) => {
    const ids = selectIds(thunkAPI.getState())

    const deleteOperations = ids.map((id) => {
      return { command: "Delete", itemId: id }
    })

    await userbase.putTransaction({
      databaseName: DB_NAME,
      operations: deleteOperations,
    })
  }
)

export const upsertEntry = createAsyncThunk(
  `${DB_ITEM}/upsert`,
  async (payload, thunkAPI) => {
    const { date, note } = payload
    const entryId = entryIdFromDate(date)
    const current = selectById(thunkAPI.getState(), entryId)
    const userbasePayload = {
      databaseName: DB_NAME,
      itemId: entryId,
      item: { note },
    }

    if (isUndefined(current)) {
      return await userbase.insertItem(userbasePayload)
    } else {
      return await userbase.updateItem(userbasePayload)
    }
  }
)

// =========================================================
//
//  Reducer
//
// =========================================================

const upsertChange = (state, { meta, error }) => {
  const {
    requestId,
    requestStatus,
    arg: { date, note },
  } = meta

  const index = state.changes.findIndex(
    (change) => change.requestId === requestId
  )
  if (index !== -1) {
    state.changes[index].requestStatus = requestStatus
    state.changes[index].error = error
  } else {
    state.changes.push({
      requestId,
      requestStatus,
      itemId: entryIdFromDate(date),
      item: { note },
    })
  }
}

const entriesSlice = createSlice({
  name: SLICE_NAME,
  initialState: entriesAdaptor.getInitialState({
    status: DB_STATUS.INITIAL,
    error: null,
    changes: [],
  }),
  reducers: {},
  extraReducers: {
    [initEntries.pending]: (state) => {
      state.status = DB_STATUS.OPENING
    },
    [initEntries.fulfilled]: (state) => {
      state.status = DB_STATUS.OPENED
    },
    [initEntries.rejected]: (state, { error }) => {
      state.status = DB_STATUS.FAILED
      state.error = error
    },
    [upsertEntry.pending]: (state, action) => {
      upsertChange(state, action)
    },
    [upsertEntry.fulfilled]: (state, action) => {
      upsertChange(state, action)
    },
    [upsertEntry.rejected]: (state, action) => {
      upsertChange(state, action)
    },
    [`${DB_NAME}/changed`]: (state, { payload }) => {
      entriesAdaptor.setAll(state, payload.items)
    },
  },
})

// =========================================================
//
//  Selectors
//
// =========================================================

const transformItemToEntry = ({ itemId, item }) => {
  return {
    entryId: itemId,
    date: makeDate(itemId),
    note: item.note,
    tags: uniq(tagsFromText(item.note)),
  }
}

const selectEntryId = (state, props) => {
  if (props.date) {
    return entryIdFromDate(props.date)
  } else {
    return props.entryId
  }
}

const selectEntriesSlice = (state) => state[SLICE_NAME]

export const selectAreEntriesLoading = createSelector(
  [selectEntriesSlice],
  (slice) => {
    return [DB_STATUS.INITIAL, DB_STATUS.OPENING].includes(slice.status)
  }
)

const selectChanges = createSelector([selectEntriesSlice], (slice) => {
  return slice.changes
})

export const selectEntries = createSelector([selectAll], (items) => {
  return items.map(transformItemToEntry)
})

export const selectEntriesById = createSelector([selectEntries], (entries) => {
  // TODO: Use selectEntities, but then the transformation needs to happen in the reducer first
  return keyBy(entries, "entryId")
})

export const selectEntriesSortedByDate = createSelector(
  [selectEntries],
  (entries) => {
    // TODO: Replace with selectEntries since they are already sorted by date,
    // but then the transformation needs to happen in the reducer first
    return sortBy(entries, "date")
  }
)

export const selectPendingEntry = createSelector(
  [selectChanges, selectEntryId],
  (changes, entryId) => {
    const pendingEntries = changes.filter((change) => {
      return change.requestStatus === "pending" && change.itemId === entryId
    })
    if (pendingEntries.length > 0) {
      return transformItemToEntry(last(pendingEntries))
    }
  }
)

export const selectIsEntryPending = createSelector(
  [selectPendingEntry],
  (pendingEntry) => {
    return !!pendingEntry
  }
)

export const selectEntry = createSelector(
  [selectEntriesById, selectPendingEntry, selectEntryId],
  (entriesById, pendingEntry, id) => {
    return pendingEntry || entriesById[id]
  }
)

export const selectEntryNote = createSelector([selectEntry], (entry) => {
  return entry ? entry.note : ""
})

export const selectEntryTags = createSelector([selectEntry], (entry) => {
  return entry && entry.tags
})

export const selectIsMenstruationForDate = createSelector(
  [selectEntryTags, selectMensesTagText],
  (tags = [], menstruationTag) => {
    // TODO: If this is in use then needs to check for all menstruation tags
    return tags.includes(menstruationTag)
  }
)

// =========================================================
//
//  Default exports
//
// =========================================================

export const name = entriesSlice.name
export default entriesSlice.reducer
