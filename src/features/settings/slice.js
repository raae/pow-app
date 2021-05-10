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
const DB_MENSES_TAG_KEY = "tag"
const DB_CYCLE_LENGTH_KEY = "daysBetween"

export const SETTINGS_STATUS = {
  INITIAL: `[${DB_NAME}] Initial`,
  OPENING: `[${DB_NAME}] Opening`,
  OPENED: `[${DB_NAME}] Opened`,
  FAILED: `[${DB_NAME}] Failed`,
}

// Adaptor

const settingsAdaptor = createEntityAdapter({
  selectId: (setting) => setting.itemId,
})

const { selectById } = settingsAdaptor.getSelectors(
  (state) => state[SLICE_NAME]
)

// Thunks

export const initSettings = createAsyncThunk(
  `${DB_NAME}/init`,
  async (_, thunkAPI) => {
    await userbase.openDatabase({
      databaseName: DB_NAME,
      changeHandler: (items) => {
        thunkAPI.dispatch({
          type: `${DB_NAME}/changed`,
          payload: { items },
        })
      },
    })
  }
)

export const addMensesTag = createAsyncThunk(
  `${DB_ITEM}/upsert`,
  async (payload, thunkAPI) => {
    const tag = payload
    const current = selectById(thunkAPI.getState(), DB_MENSES_TAG_KEY)

    if (isUndefined(current)) {
      await userbase.insertItem({
        databaseName: DB_NAME,
        itemId: DB_MENSES_TAG_KEY,
        item: tag,
      })
    } else {
      const tags = [tag, ...textToTagArray(current.item)]

      await userbase.updateItem({
        databaseName: DB_NAME,
        itemId: DB_MENSES_TAG_KEY,
        item: tagArrayToText(tags),
      })
    }
  }
)

export const setInitialCycleLength = createAsyncThunk(
  `${DB_ITEM}/upsert`,
  async (payload) => {
    const length = parseInt(payload)

    if (!isNumber(length)) {
      throw new Error("Length is not a number")
    }

    await userbase.insertItem({
      databaseName: DB_NAME,
      itemId: DB_CYCLE_LENGTH_KEY,
      item: length,
    })
  }
)

// Store

const settingsSlice = createSlice({
  name: SLICE_NAME,
  initialState: settingsAdaptor.getInitialState({
    status: SETTINGS_STATUS.INITIAL,
  }),
  reducers: {},
  extraReducers: {
    [initSettings.pending]: (state) => {
      state.status = SETTINGS_STATUS.OPENING
    },
    [initSettings.fulfilled]: (state) => {
      state.status = SETTINGS_STATUS.OPENED
    },
    [initSettings.rejected]: (state, { error }) => {
      state.status = SETTINGS_STATUS.FAILED
      state.error = error
    },
    [`${DB_NAME}/changed`]: (state, { payload }) => {
      settingsAdaptor.setAll(state, payload.items)
    },
  },
})

// Selectors

const selectSettingsSlice = (state) => state[SLICE_NAME]

export const selectAreSettingsLoading = createSelector(
  [selectSettingsSlice],
  (slice) => {
    return [SETTINGS_STATUS.INITIAL, SETTINGS_STATUS.OPENING].includes(
      slice.status
    )
  }
)

export const selectSetting = createSelector([selectById], (setting) => {
  if (setting) {
    return setting.item
  }
})

export const selectMensesTagText = (state) => {
  return selectSetting(state, DB_MENSES_TAG_KEY) || ""
}

export const selectMensesTags = createSelector(
  [selectMensesTagText],
  (mensesTagText) => {
    return textToTagArray(mensesTagText)
  }
)

export const selectMainMensesTag = createSelector(
  [selectMensesTags],
  (mensesTags) => {
    return first(mensesTags)
  }
)

export const selectInitialDaysBetween = (state) => {
  const length = selectSetting(state, DB_CYCLE_LENGTH_KEY)
  if (length) {
    // Will for some be saved as string
    return parseInt(length, 10)
  }
}

export const name = settingsSlice.name
export default settingsSlice.reducer
