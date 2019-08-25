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
  const [{ entriesByDate, isFetched }, setState] = useStore()

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

  const setFetchedEntriesByDate = (entries) => {
    // Used when entries are loaded from the
    setState((state) => ({
      ...state,
      isFetched: true,
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
      isFetched,
    },
    {
      addEntry,
      changeEntry,
      clearEntry,
      setFetchedEntriesByDate,
    },
  ]
}

export default useEntries
