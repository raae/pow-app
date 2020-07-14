import { createSelector } from "@reduxjs/toolkit"
import { keyBy, sortBy, uniq } from "lodash"

import {
  openDatabase,
  selectDatabaseItems,
  upsertItem,
  selectIsDatabaseInitialized,
} from "../database/slice"

import { selectMenstruationTag } from "../settings/slice"

import { makeDate } from "../utils/days"
import { tagsFromText } from "../utils/tags"

const DATABASE_NAME = "entries"

// Actions

export const initEntries = openDatabase({ databaseName: DATABASE_NAME })

export const upsertEntry = (entryId, entry) => {
  return upsertItem({
    databaseName: DATABASE_NAME,
    itemId: entryId,
    item: entry,
  })
}

// Selectors

const selectEntryId = (state, props) => {
  return props.entryId
}

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
      tags: uniq(tagsFromText(item.note)),
    }
  })
})

export const selectEntriesSortedByDate = createSelector(
  [selectEntries],
  (entries) => {
    return sortBy(entries, "date")
  }
)

export const selectEntriesById = createSelector([selectEntries], (entries) => {
  return keyBy(entries, "id")
})

export const selectEntry = createSelector(
  [selectEntriesById, selectEntryId],
  (entriesById, id) => {
    return entriesById[id]
  }
)

export const selectEntryNote = createSelector([selectEntry], (entry) => {
  return entry ? entry.note : ""
})

export const selectEntryTags = createSelector([selectEntry], (entry) => {
  return entry && entry.tags
})

export const selectIsMenstruationForDate = createSelector(
  [selectEntryTags, selectMenstruationTag],
  (tags = [], menstruationTag) => {
    return tags.includes(menstruationTag)
  }
)
