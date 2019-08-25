import { useEffect, useRef } from "react"
import { isEmpty, mergeWith, isEqual } from "lodash"
import useEntries from "./useEntries"
import useBlockstack from "./useBlockstack"

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

const syncEntries = () => {
  const persistedEntriesRef = useRef()
  const [{ entriesByDate }, { setFetchedEntriesByDate }] = useEntries()
  const [{ user }, { getJson, putJson }] = useBlockstack()

  const fetchEntries = async () => {
    const persistedEntriesByDate = await getJson()
    persistedEntriesRef.current = persistedEntriesByDate
    if (persistedEntriesByDate) {
      const mergedEntries = mergeWith(
        persistedEntriesByDate,
        entriesByDate,
        mergeCustomizer
      )
      setFetchedEntriesByDate(mergedEntries)
      return mergedEntries
    } else {
      setFetchedEntriesByDate(entriesByDate)
      return entriesByDate
    }
  }

  const persistEntries = async () => {
    const mergedEntries = await fetchEntries()

    if (mergedEntries) {
      persistedEntriesRef.current = mergedEntries
      putJson(mergedEntries)
    }
  }

  useEffect(() => {
    if (!user) return
    if (isEmpty(entriesByDate)) return
    if (isEqual(entriesByDate, persistedEntriesRef.current)) return

    persistEntries()
  }, [entriesByDate])

  useEffect(() => {
    if (!user) return

    fetchEntries()
  }, [user])
}

export default syncEntries
