import { useEffect, useState } from "react"
import queryString from "query-string"

const useSearchParams = () => {
  const [searchParams, setSearch] = useState({})

  useEffect(() => {
    if (!document) return {}

    setSearch(
      document.location.search
        ? queryString.parse(document.location.search)
        : {}
    )
  }, [])

  return searchParams
}

const useQueryParam = (key, defaultState) => {
  const searchParams = useSearchParams()

  if (searchParams[key]) {
    return searchParams[key]
  } else {
    return defaultState
  }
}

export { useSearchParams, useQueryParam }
