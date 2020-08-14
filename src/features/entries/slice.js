import { createSelector } from "@reduxjs/toolkit"
import { keyBy, sortBy, uniq, first } from "lodash"

import {
  openDatabase,
  selectDatabaseItems,
  selectDatabasePendingItemsById,
  upsertItem,
  selectIsDatabaseLoading,
} from "../database"

import { selectMenstruationTag } from "../settings"

import { makeDate, entryIdFromDate } from "../utils/days"
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

export const selectAreEntriesLoading = (state) => {
  return selectIsDatabaseLoading(state, {
    databaseName: DATABASE_NAME,
  })
}

const selectItems = (state) => {
  return selectDatabaseItems(state, { databaseName: DATABASE_NAME })
}

const selectPendingItemsById = (state) => {
  return selectDatabasePendingItemsById(state, { databaseName: DATABASE_NAME })
}

export const selectEntries = createSelector([selectItems], (items) => {
  return items.map(transformItemToEntry)
})

export const selectEntriesById = createSelector([selectEntries], (entries) => {
  return keyBy(entries, "entryId")
})

export const selectEntriesSortedByDate = createSelector(
  [selectEntries],
  (entries) => {
    return sortBy(entries, "date")
  }
)

export const selectIsEntryPending = createSelector(
  [selectPendingItemsById, selectEntryId],
  (pendingByItemId, entryId) => {
    const pendingItem = first(pendingByItemId[entryId])
    return !!pendingItem
  }
)

export const selectPendingEntry = createSelector(
  [selectPendingItemsById, selectEntryId],
  (pendingByItemId, entryId) => {
    const pendingItem = first(pendingByItemId[entryId])
    if (pendingItem) {
      return transformItemToEntry(pendingItem)
    }
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
  [selectEntryTags, selectMenstruationTag],
  (tags = [], menstruationTag) => {
    return tags.includes(menstruationTag)
  }
)
