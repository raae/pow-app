import { useEffect, useRef } from "react"
import { isEmpty, merge, isEqual } from "lodash"
import useEntries from "./useEntries"
import useBlockstack from "./useBlockstack"

const syncEntries = () => {
  const persistedEntriesRef = useRef()
  const [{ entriesByDate }, { setEntriesByDate }] = useEntries()
  const [{ user }, { getJson, putJson }] = useBlockstack()

  const fetchEntries = async () => {
    const persistedEntriesByDate = await getJson()
    persistedEntriesRef.current = persistedEntriesByDate
    if (persistedEntriesByDate) {
      const mergedEntries = merge(persistedEntriesByDate, entriesByDate)
      setEntriesByDate(mergedEntries)
      return mergedEntries
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
