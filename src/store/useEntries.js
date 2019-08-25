import { useStore } from "./store"

const tagsFromNote = (note) => {
  const match = note.match(/#[^\s#]+/g)
  if (!match) {
    return []
  } else {
    return note.match(/#[^\s#]+/g).map((tag) => tag.replace("#", ""))
  }
}

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
      entriesByDate: entriesByDate,
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
