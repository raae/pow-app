import { createSelector } from "@reduxjs/toolkit"
import { keyBy } from "lodash"

import { SETTINGS_DATABASE } from "../../constants"

import {
  openDatabase,
  selectDatabaseItems,
  selectIsDatabaseLoading,
  upsertItem,
  insertItem,
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

export const insertSetting = (id, setting) => {
  return insertItem({
    databaseName,
    itemId: id,
    item: setting,
  })
}

// Selectors

export const selectAreSettingsLoading = (state) => {
  return selectIsDatabaseLoading(state, {
    databaseName,
  })
}

const selectItems = (state) => {
  return selectDatabaseItems(state, { databaseName })
}

export const selectSettingsById = createSelector([selectItems], (items) => {
  return keyBy(items, "itemId")
})

export const selectSetting = (state, { id }) => {
  const settingsById = selectSettingsById(state)
  return settingsById[id] && settingsById[id].item
}

export const selectMenstruationTag = (state) => {
  return selectSetting(state, { id: "tag" }) || ""
}

export const selectInitialDaysBetween = (state) => {
  const daysBetween = selectSetting(state, { id: "daysBetween" })
  if (daysBetween) {
    // Will for some be saved as string
    return parseInt(daysBetween, 10)
  }
}
