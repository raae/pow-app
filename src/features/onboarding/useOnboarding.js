import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectHasMensesStartDate } from "../cycle"
import { upsertEntry } from "../entries"
import { useSettings } from "../settings"

export const useOnboarding = () => {
  const dispatch = useDispatch()
  const {
    mensesTags,
    mainMensesTag,
    initialCycleLength,
    setInitialCycleLength,
    addMensesTag,
  } = useSettings()

  const hasMensesStartDate = useSelector(selectHasMensesStartDate)

  const handleSetInitialMensesDate = useCallback(
    (date) => {
      return dispatch(upsertEntry({ date, note: `#${mainMensesTag}` }))
    },
    [dispatch, mainMensesTag]
  )

  return {
    addMensesTag,
    setInitialCycleLength,
    setInitialMensesDate: handleSetInitialMensesDate,
    mensesTags,
    mainMensesTag,
    initialCycleLength,
    hasMensesStartDate,
  }
}
