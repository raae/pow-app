import { useEffect, useRef } from "react"
import { mergeWith, isEqual } from "lodash"
import useEntries from "./useEntries"
import useBlockstack from "./useBlockstack"
import useStatus from "./useStatus"
import useSettings from "./useSettings"

const mergeCustomizer = (objValue, srcValue) => {
  if (!objValue) {
    return srcValue
  }

  if (!srcValue) {
    return objValue
  }

  if (objValue.timestamp > srcValue.timestamp) {
    return objValue
  } else {
    return srcValue
  }
}

const mergeSlice = (sliceA, sliceB) => {
  return mergeWith(sliceA, sliceB, mergeCustomizer)
}

const usePersistStorage = () => {
  const persistedDataRef = useRef()
  const [{ isInitialized }, { setIsInitialized }] = useStatus()
  const [{ settings }, { overrideAllSettings }] = useSettings()
  const [{ entriesByDate }, { overrideAllEntriesByDate }] = useEntries()
  const [{ auth, user }, { getJson, putJson }] = useBlockstack()

  const fetchPersistedDataAndMerge = async () => {
    const persistedData = await getJson()

    const mergedData = {
      entriesByDate,
      settings,
    }

    if (persistedData) {
      persistedDataRef.current = {
        entriesByDate: persistedData.entriesByDate,
        settings: persistedData.settings,
      }

      mergedData.entriesByDate = mergeSlice(
        persistedData.entriesByDate,
        entriesByDate
      )

      mergedData.settings = mergeSlice(persistedData.settings, settings)

      setIsInitialized(true)
      overrideAllEntriesByDate(mergedData.entriesByDate)
      overrideAllSettings(mergedData.settings)
    }

    return mergedData
  }

  const persistState = async () => {
    const persistedData = await fetchPersistedDataAndMerge()

    if (persistedData) {
      persistedDataRef.current = persistedData
      putJson(persistedData)
    }
  }

  useEffect(() => {
    if (!isInitialized) return

    const currentData = { entriesByDate, settings }

    if (!isEqual(currentData, persistedDataRef.current)) {
      persistState()
    }
  }, [entriesByDate, settings])

  useEffect(() => {
    if (!user) return

    fetchPersistedDataAndMerge()
  }, [user])

  useEffect(() => {
    // if (!user) return

    const onWindowFocus = () => {
      fetchPersistedDataAndMerge()
    }

    window.addEventListener("focus", onWindowFocus)
    return () => {
      window.removeEventListener("focus", onWindowFocus)
    }
  }, [isInitialized, user])
}

export default usePersistStorage
