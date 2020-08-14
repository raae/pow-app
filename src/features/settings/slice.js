import { createSelector } from "@reduxjs/toolkit"
import { keyBy } from "lodash"

import {
  openDatabase,
  selectDatabaseItems,
  selectIsDatabaseLoading,
  upsertItem,
  insertItem,
} from "../database"

const DATABASE_NAME = "settings"

// Actions

export const initSettings = openDatabase({ databaseName: DATABASE_NAME })

export const upsertSetting = (id, setting) => {
  return upsertItem({
    databaseName: DATABASE_NAME,
    itemId: id,
    item: setting,
  })
}

export const insertSetting = (id, setting) => {
  return insertItem({
    databaseName: DATABASE_NAME,
    itemId: id,
    item: setting,
  })
}

// Selectors

export const selectAreSettingsLoading = (state) => {
  return selectIsDatabaseLoading(state, {
    databaseName: DATABASE_NAME,
  })
}

const selectItems = (state) => {
  return selectDatabaseItems(state, { databaseName: DATABASE_NAME })
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