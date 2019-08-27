import { useStore } from "./store"
import { INIT_STATUS_KEY } from "./constants"

const useStatus = () => {
  const [{ status }, setState] = useStore()

  const updateStatus = (key, status) => {
    setState((state) => ({
      ...state,
      status: {
        ...state.status,
        [key]: status,
      },
    }))
  }

  const getStatus = (key) => {
    if (!status.hasOwnProperty(key)) {
      console.warn(`No ${key} on status slice of state`, status)
    }
    return status[key]
  }

  const setIsInitialized = (status) => {
    return updateStatus(INIT_STATUS_KEY, status)
  }

  return [
    {
      isInitialized: getStatus(INIT_STATUS_KEY),
    },
    {
      setIsInitialized,
    },
  ]
}

export default useStatus
