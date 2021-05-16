import { first } from "lodash"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  STATUS,
  selectSettings,
  selectSettingsStatus,
  addMensesTag,
  setInitialCycleLength,
} from "./slice"

export const useSettings = () => {
  const dispatch = useDispatch()
  const { mensesTags, initialCycleLength } = useSelector(selectSettings)
  const status = useSelector(selectSettingsStatus)

  const handleAddMensesTag = useCallback(
    (tag) => {
      return dispatch(addMensesTag(tag))
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
    isLoading: [STATUS.INITIAL, STATUS.OPENING].includes(status),
    addMensesTag: handleAddMensesTag,
    setInitialCycleLength: handleSetInitialCycleLength,
    mensesTags,
    mainMensesTag: first(mensesTags),
    initialCycleLength,
  }
}
