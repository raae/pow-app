import { createSelector } from "@reduxjs/toolkit"
import {
  openDatabase,
  selectDatabaseItems,
  upsertItem,
  selectIsDatabaseInitialized,
} from "../database/slice"

import { keyBy } from "lodash"
import { makeDate } from "../utils/days"
import { tagsFromText } from "../utils/tags"

const DATABASE_NAME = "entries"

// Actions

export const initEntries = openDatabase({ databaseName: DATABASE_NAME })

export const upsertEntry = (id, entry) => {
  return upsertItem({
    databaseName: DATABASE_NAME,
    itemId: id,
    item: entry,
  })
}

// Selectors

export const selectAreEntriesInitialized = (state) => {
  return selectIsDatabaseInitialized(state, {
    databaseName: DATABASE_NAME,
  })
}

const selectItems = (state) => {
  return selectDatabaseItems(state, { databaseName: DATABASE_NAME })
}

export const selectEntries = createSelector([selectItems], (items) => {
  return items.map(({ itemId, item }) => {
    return {
      id: itemId,
      date: makeDate(itemId),
      note: item.note,
      tags: tagsFromText(item.note),
    }
  })
})

export const selectEntriesById = createSelector([selectEntries], (entries) => {
  return keyBy(entries, "id")
})

export const selectEntry = (state, { id }) => {
  const entriesById = selectEntriesById(state)
  return entriesById[id]
}

export const selectEntryNote = (state, { id }) => {
  const entry = selectEntry(state, { id })
  return entry ? entry.note : ""
}
