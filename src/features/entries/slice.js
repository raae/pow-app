import { createSelector } from "@reduxjs/toolkit"
import { keyBy, sortBy, uniq, first } from "lodash"

import { ENTRIES_DATABASE } from "../../constants"

import {
  openDatabase,
  selectDatabaseItems,
  selectDatabasePendingItemsById,
  upsertItem,
  selectIsDatabaseLoading,
  emptyDatabase,
} from "../database"

import { selectMensesTagText } from "../settings"

import { makeDate, entryIdFromDate } from "../utils/days"
import { tagsFromText } from "../utils/tags"

// Actions

const databaseName = ENTRIES_DATABASE.databaseName

export const initEntries = () => openDatabase({ databaseName })
export const emptyEntries = () => emptyDatabase({ databaseName })

export const upsertEntry = (date, entry) => {
  return upsertItem({
    databaseName,
    itemId: entryIdFromDate(date),
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
    databaseName,
  })
}

const selectItems = (state) => {
  return selectDatabaseItems(state, { databaseName })
}

const selectPendingItemsById = (state) => {
  return selectDatabasePendingItemsById(state, { databaseName })
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
  [selectEntryTags, selectMensesTagText],
  (tags = [], menstruationTag) => {
    return tags.includes(menstruationTag)
  }
)
