import { values } from "lodash"

import { useStore } from "./store"

const useEntries = () => {
  const [{ entriesByDate }, setState] = useStore()

  const updateEntry = (entry) => {
    setState((state) => ({
      ...state,
      entriesByDate: {
        ...state.entriesByDate,
        // Add or overwrite existing entry
        [entry.date]: { ...entry, timestamp: Date.now() },
      },
    }))
  }

  const setEntriesByDate = (entries) => {
    // Used when entries are loaded from the
    setState((state) => ({
      ...state,
      entriesByDate: entries,
    }))
  }

  const addEntry = (entry) => {
    updateEntry(entry)
  }

  const changeEntry = (entry) => {
    updateEntry(entry)
  }

  const clearEntry = (entry) => {
    // Remove everything, but the date
    updateEntry({ date: entry.date })
  }

  return [
    {
      entriesByDate,
      entries: values(entriesByDate || {}),
    },
    {
      addEntry,
      changeEntry,
      clearEntry,
      setEntriesByDate,
    },
  ]
}

export default useEntries
