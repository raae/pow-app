import { createSelector, createAsyncThunk } from "@reduxjs/toolkit"
import { keyBy, first, compact, uniq } from "lodash"

import { SETTINGS_DATABASE } from "../../constants"

import { cleanTag } from "../utils/tags"

import {
  openDatabase,
  selectDatabaseItems,
  selectIsDatabaseLoading,
  upsertItem,
} from "../database"

const databaseName = SETTINGS_DATABASE.databaseName

// Actions

export const initSettings = () => openDatabase({ databaseName })

export const upsertSetting = (id, setting) => {
  return upsertItem({
    databaseName,
    itemId: id,
    item: setting,
  })
}

export const upsertMensesTags = (tags) => {
  const validTags = uniq(compact(tags.map((tag) => cleanTag(tag))))
  return upsertSetting("tag", validTags.join(","))
}

export const addMensesTag = createAsyncThunk(
  "mensesTags/add",
  async (arg, { getState, dispatch }) => {
    const { tag } = arg
    const mensesTags = selectMensesTags(getState())
    return dispatch(upsertMensesTags([tag, ...mensesTags]))
  }
)

// Selectors

export const selectAreSettingsLoading = (state) => {
  return selectIsDatabaseLoading(state, {
    databaseName,
  })
}

const selectId = (state, props) => props.id

const selectItems = (state) => {
  return selectDatabaseItems(state, { databaseName })
}

export const selectSettingsById = createSelector([selectItems], (items) => {
  return keyBy(items, "itemId")
})

export const selectSetting = createSelector(
  [selectSettingsById, selectId],
  (settingsById, id) => {
    return settingsById[id] && settingsById[id].item
  }
)

export const selectMensesTagText = (state) => {
  return selectSetting(state, { id: "tag" }) || ""
}

export const selectMensesTags = createSelector(
  [selectMensesTagText],
  (mensesTagText) => {
    return mensesTagText.split(",").map((tag) => cleanTag(tag))
  }
)

export const selectMainMensesTag = createSelector(
  [selectMensesTags],
  (mensesTags) => {
    return first(mensesTags)
  }
)

export const selectInitialDaysBetween = (state) => {
  const daysBetween = selectSetting(state, { id: "daysBetween" })
  if (daysBetween) {
    // Will for some be saved as string
    return parseInt(daysBetween, 10)
  }
}
