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
const DB_NAME = SLICE_NAME
const DB_ITEM = "setting"

const MENSES_TAG_KEY = {
  DB: "tag",
  SLICE: "mensesTags",
}

const CYCLE_LENGTH_KEY = {
  DB: "daysBetween",
  SLICE: "initialCycleLength",
}

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

const settingsAdaptor = createEntityAdapter({
  selectId: (setting) => setting.key,
})

const { selectById } = settingsAdaptor.getSelectors(
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
  `${DB_ITEM}/upsert`,
  async (payload, thunkAPI) => {
    const tag = payload
    const current = selectById(thunkAPI.getState(), MENSES_TAG_KEY.DB)

    if (isUndefined(current)) {
      await userbase.insertItem({
        databaseName: DB_NAME,
        itemId: MENSES_TAG_KEY.DB,
        item: tag,
      })
    } else {
      // Add new tag and make sure we only store valid values,
      // even potentially cleaning up invalid values already stored.
      const tags = [tag, ...textToTagArray(current.item)]
      const updatedItem = tagArrayToText(tags)

      await userbase.updateItem({
        databaseName: DB_NAME,
        itemId: MENSES_TAG_KEY.DB,
        item: updatedItem,
      })
    }
  }
)

export const setInitialCycleLength = createAsyncThunk(
  `${DB_ITEM}/upsert`,
  async (payload) => {
    const length = parseInt(payload)

    if (!isNumber(length)) {
      throw new Error(`Initial cycle length must be a number, not ${length}`)
    }

    await userbase.insertItem({
      databaseName: DB_NAME,
      itemId: CYCLE_LENGTH_KEY.DB,
      item: length,
    })
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
    status: DB_STATUS.INITIAL,
  }),
  reducers: {},
  extraReducers: {
    [initSettings.pending]: (state) => {
      state.status = DB_STATUS.OPENING
    },
    [initSettings.fulfilled]: (state) => {
      state.status = DB_STATUS.OPENED
    },
    [initSettings.rejected]: (state, { error }) => {
      state.status = DB_STATUS.FAILED
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

export const selectAreSettingsLoading = createSelector(
  [selectSettingsSlice],
  (slice) => {
    return [DB_STATUS.INITIAL, DB_STATUS.OPENING].includes(slice.status)
  }
)

export const selectSetting = createSelector([selectById], (setting) => {
  if (setting) {
    return setting.value
  }
})

const DEFAULT_MENSES_TAGS = []
export const selectMensesTags = (state) => {
  return selectSetting(state, MENSES_TAG_KEY.SLICE) || DEFAULT_MENSES_TAGS
}

export const selectMainMensesTag = createSelector(
  [selectMensesTags],
  (mensesTags) => {
    return first(mensesTags)
  }
)

export const selectInitialDaysBetween = (state) => {
  return selectSetting(state, CYCLE_LENGTH_KEY.SLICE)
}

// =========================================================
//
//  Default exports
//
// =========================================================

export const name = settingsSlice.name
export default settingsSlice.reducer
