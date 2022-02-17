import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  STATUS,
  addMensesTag,
  setInitialCycleLength,
  deleteAllMensesTags,
  selectSettingsStatus,
  selectSettings,
} from "./slice"

export const useSettings = () => {
  const dispatch = useDispatch()

  const status = useSelector(selectSettingsStatus)
  const settings = useSelector(selectSettings)

  const handleAddMensesTag = useCallback(
    (tag) => {
      return dispatch(addMensesTag(tag))
    },
    [dispatch]
  )

  const handleDeleteAllMensesTags = useCallback(
    (tag) => {
      return dispatch(deleteAllMensesTags(tag))
    },
    [dispatch]
  )

  const handleSetInitialCycleLength = useCallback(
    (tag) => {
      return dispatch(setInitialCycleLength(tag))
    },
    [dispatch]
  )

  return {
    ...settings,
    isLoading: [STATUS.INITIAL, STATUS.OPENING].includes(status),
    addMensesTag: handleAddMensesTag,
    deleteAllMensesTags: handleDeleteAllMensesTags,
    setInitialCycleLength: handleSetInitialCycleLength,
  }
}
