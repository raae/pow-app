import { createSelector } from "@reduxjs/toolkit"
import {
  openDatabase,
  selectDatabaseItems,
  selectIsDatabaseInitialized,
  upsertItem,
  insertItem,
} from "../database/slice"
import { keyBy } from "lodash"

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

export const selectAreSettingsInitialized = (state) => {
  return selectIsDatabaseInitialized(state, {
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
