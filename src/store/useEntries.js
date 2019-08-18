import { values } from "lodash"

import { useStore } from "./store"

const useEntries = () => {
  const [{ entriesByDate }, setState] = useStore()

  const updateEntry = entry => {
    setState(state => ({
      ...state,
      entriesByDate: {
        ...state.entriesByDate,
        // Add or overwrite entry
        [entry.date]: { ...entry, timestamp: Date.now() },
      },
    }))
  }

  const addEntry = entry => {
    updateEntry(entry)
  }

  const changeEntry = entry => {
    updateEntry(entry)
  }

  const clearEntry = entry => {
    // Remove everything, but the date
    updateEntry({ date: entry.date })
  }

  return [
    { entries: values(entriesByDate) },
    { addEntry, changeEntry, clearEntry },
  ]
}

export default useEntries
