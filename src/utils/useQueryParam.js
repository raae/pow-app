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
  return searchParams[key]
    ? searchParams[key]
    : defaultState
    ? defaultState
    : null
}

export { useSearchParams, useQueryParam }
