import { useStore } from "../store"
import { tagsFromNote } from "./utils"

const useEntries = () => {
  const [{ entriesByDate }, setState] = useStore()

  const updateEntry = (entry) => {
    setState((state) => ({
      ...state,
      entriesByDate: {
        ...state.entriesByDate,
        // Add or overwrite existing entry
        [entry.date]: {
          ...entry,
          tags: tagsFromNote(entry.note),
          timestamp: Date.now(),
        },
      },
    }))
  }

  const overrideAllEntriesByDate = (newEntries) => {
    setState((state) => ({
      ...state,
      entriesByDate: newEntries,
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
    },
    {
      addEntry,
      changeEntry,
      clearEntry,
      overrideAllEntriesByDate,
    },
  ]
}

export default useEntries
