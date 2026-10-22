import { useEffect, useState } from "react"

const useSearchParams = () => {
  const [searchParams, setSearch] = useState({})

  useEffect(() => {
    if (!document) return {}

    setSearch(Object.fromEntries(new URLSearchParams(document.location.search)))
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
