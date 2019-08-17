import { useEffect, useRef, useReducer } from "react"
import { merge, keyBy, values } from "lodash"

const DEFAULT_STATE = {
  isUpdating: false,
  isInitializing: true,
  isError: false,
  entries: [],
}

const storageReducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        isInitializing: true,
        isError: false,
      }
    case "UPDATE":
      return {
        ...state,
        isUpdating: true,
        entries: action.payload,
      }
    case "UPDATED":
      return {
        ...state,
        isUpdating: false,
        isInitializing: false,
        isError: false,
        entries: action.payload,
      }
    case "FAILED":
      return {
        ...state,
        isInitializing: false,
        isUpdating: false,
        isError: action.payload,
      }
    case "CLEAR":
      return DEFAULT_STATE
    default:
      throw new Error()
  }
}

const useStorage = ({ isAuthenticated, getJson, putJson }) => {
  const entriesRef = useRef(DEFAULT_STATE.entries)
  const didCancelRef = useRef(false)

  const [state, dispatch] = useReducer(storageReducer, {
    ...DEFAULT_STATE,
    entries: entriesRef.current,
  })

  const initAction = () => {
    dispatch({ type: "INIT" })
  }

  const clearAction = () => {
    dispatch({ type: "CLEAR" })
  }

  const updateAction = entries => {
    dispatch({ type: "UPDATE", payload: entries })
  }

  const updatedAction = entries => {
    if (didCancelRef.current) {
      entriesRef.current = entries
    } else {
      dispatch({ type: "UPDATED", payload: entries })
    }
  }

  const updateEntries = async (entries, { overwrite } = {}) => {
    updateAction(entries)
    if (overwrite) {
      await putJson(entries)
      updatedAction(entries)
    } else {
      const storedEntries = await getJson()
      const mergedEntriesById = merge(
        keyBy(storedEntries, "id"),
        keyBy(entries, "id")
      )
      const mergedEntries = values(mergedEntriesById)
      updatedAction(mergedEntries)
      await putJson(mergedEntries)
    }
  }

  const addEntry = entry => {
    updateEntries([entry, ...state.entries])
  }

  const deleteEntries = () => {
    updateEntries([], { overwrite: true })
  }

  useEffect(() => {
    return () => {
      didCancelRef.current = true
    }
  }, [])

  useEffect(() => {
    entriesRef.current = state.entries
  }, [state.entries])

  useEffect(() => {
    const initEntries = async () => {
      initAction()
      const entries = (await getJson()) || []
      updatedAction(entries)
    }

    const clearEntries = () => {
      clearAction()
    }

    if (isAuthenticated) {
      initEntries()
    } else {
      clearEntries()
    }
  }, [isAuthenticated])

  return [
    state,
    {
      addEntry,
      deleteEntries,
    },
  ]
}

export default useStorage
