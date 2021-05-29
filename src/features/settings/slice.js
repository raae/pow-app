import {
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit"
import userbase from "userbase-js"
import { first, isNumber, isUndefined } from "lodash"

import { tagArrayToText, textToTagArray } from "./utils"

const SLICE_NAME = "settings"
const SLICE_ENTITY = "setting"
const DB_NAME = SLICE_NAME

const MENSES_TAG_KEY = {
  DB: "tag",
  SLICE: "mensesTags",
}

const CYCLE_LENGTH_KEY = {
  DB: "daysBetween",
  SLICE: "initialCycleLength",
}

export const STATUS = {
  INITIAL: `[${SLICE_NAME}] Initial`,
  OPENING: `[${SLICE_NAME}] Opening`,
  OPENED: `[${SLICE_NAME}] Opened`,
  FAILED: `[${SLICE_NAME}] Failed`,
}

// =========================================================
//
//  Adaptor
//
// =========================================================

const settingsAdaptor = createEntityAdapter({
  selectId: (setting) => setting.key,
})

const { selectById, selectEntities } = settingsAdaptor.getSelectors(
  (state) => state[SLICE_NAME]
)

// =========================================================
//
//  Thunks / Actions
//
// =========================================================

const transformItemToSetting = ({ itemId, item, ...rest }) => {
  let key = itemId
  let value = item

  if (itemId === MENSES_TAG_KEY.DB) {
    // Stored as a comma separated string
    key = MENSES_TAG_KEY.SLICE
    value = textToTagArray(value)
  } else if (itemId === CYCLE_LENGTH_KEY.DB) {
    // Will for some early users be stored as a string
    key = CYCLE_LENGTH_KEY.SLICE
    value = parseInt(value, 10)
  }

  return {
    key,
    value,
    ...rest,
  }
}

export const initSettings = createAsyncThunk(
  `${DB_NAME}/init`,
  async (_, thunkAPI) => {
    await userbase.openDatabase({
      databaseName: DB_NAME,
      changeHandler: (items) => {
        // Anytime there are changes to settings
        // on the server changeHandler will be called.
        thunkAPI.dispatch({
          type: `${DB_NAME}/changed`,
          payload: { items: items.map(transformItemToSetting) },
        })
      },
    })
  }
)

export const addMensesTag = createAsyncThunk(
  `${SLICE_ENTITY}/upsert`,
  async (payload, thunkAPI) => {
    const tag = payload
    const current = selectById(thunkAPI.getState(), MENSES_TAG_KEY.SLICE)

    if (isUndefined(current)) {
      await userbase.insertItem({
        databaseName: DB_NAME,
        itemId: MENSES_TAG_KEY.DB,
        item: tag,
      })
    } else {
      // Add new tag and make sure we only store valid values,
      // even potentially cleaning up invalid values already stored.
      const tags = [tag, ...current.value]
      const updatedItem = tagArrayToText(tags)

      await userbase.updateItem({
        databaseName: DB_NAME,
        itemId: MENSES_TAG_KEY.DB,
        item: updatedItem,
      })
    }
  }
)

export const deleteAllMensesTags = createAsyncThunk(
  `${SLICE_ENTITY}/upsert`,
  async () => {
    // TODO: Throw error if entries is not empty
    await userbase.deleteItem({
      databaseName: DB_NAME,
      itemId: MENSES_TAG_KEY.DB,
    })
  }
)

export const setInitialCycleLength = createAsyncThunk(
  `${SLICE_ENTITY}/upsert`,
  async (payload, thunkAPI) => {
    const length = parseInt(payload)
    const current = selectById(thunkAPI.getState(), CYCLE_LENGTH_KEY.SLICE)

    if (!isNumber(length)) {
      throw new Error(
        `Initial cycle length must be a number, not ${typeof length}`
      )
    }

    const userbaseParams = {
      databaseName: DB_NAME,
      itemId: CYCLE_LENGTH_KEY.DB,
      item: length,
    }

    if (isUndefined(current)) {
      await userbase.insertItem(userbaseParams)
    } else {
      await userbase.updateItem(userbaseParams)
    }
  }
)

// =========================================================
//
//  Reducer
//
// =========================================================

const settingsSlice = createSlice({
  name: SLICE_NAME,
  initialState: settingsAdaptor.getInitialState({
    status: STATUS.INITIAL,
  }),
  reducers: {},
  extraReducers: {
    [initSettings.pending]: (state) => {
      state.status = STATUS.OPENING
    },
    [initSettings.fulfilled]: (state) => {
      state.status = STATUS.OPENED
    },
    [initSettings.rejected]: (state, { error }) => {
      state.status = STATUS.FAILED
      state.error = error
    },
    [`${DB_NAME}/changed`]: (state, { payload }) => {
      settingsAdaptor.setAll(state, payload.items)
    },
  },
})

// =========================================================
//
//  Selectors
//
// =========================================================

const selectSettingsSlice = (state) => state[SLICE_NAME]

export const selectSettingsStatus = createSelector(
  [selectSettingsSlice],
  (slice) => {
    return slice.status
  }
)

const DEFAULT_MENSES_TAGS = []
export const selectSettings = createSelector([selectEntities], (entities) => {
  const mensesTags = entities[MENSES_TAG_KEY.SLICE]?.value
  const initialCycleLength = entities[CYCLE_LENGTH_KEY.SLICE]?.value
  return {
    mensesTags: mensesTags || DEFAULT_MENSES_TAGS,
    mainMensesTag: first(mensesTags),
    initialCycleLength,
  }
})

// =========================================================
//
//  Default exports
//
// =========================================================

export const name = settingsSlice.name
export default settingsSlice.reducer
