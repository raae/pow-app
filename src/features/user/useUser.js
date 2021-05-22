import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectStatus, selectUser, updateUser, STATUS } from "./slice"

export const useUser = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const status = useSelector(selectStatus)

  const handleUpdateUser = useCallback(
    (payload) => {
      return dispatch(updateUser(payload))
    },
    [dispatch]
  )

  return {
    user,
    updateUser: handleUpdateUser,
    isLoading: [STATUS.INITIAL].includes(status),
  }
}
