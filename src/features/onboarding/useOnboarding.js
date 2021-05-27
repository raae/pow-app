import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { isEmpty } from "lodash"

import { selectHasMensesStartDate } from "../cycle"
import { selectAreEntriesLoading, upsertEntry } from "../entries"
import { useSettings } from "../settings"
import { useSubscription } from "../user"

export const useOnboarding = () => {
  const dispatch = useDispatch()

  const {
    isLoading: isLoadingSettings,
    mainMensesTag,
    setInitialCycleLength,
    addMensesTag,
  } = useSettings()

  const { isSubscribed } = useSubscription()
  const hasInitialCycle = useSelector(selectHasMensesStartDate)
  const isLoadingEntries = useSelector(selectAreEntriesLoading)

  const handleSetInitialCycle = useCallback(
    async ({ mensesDate, cycleLength }) => {
      const errors = {}

      if (mensesDate) {
        const { error: dateError } = await dispatch(
          upsertEntry({ date: mensesDate, note: `#${mainMensesTag}` })
        )
        if (dateError) {
          errors.mensesDate = dateError.message
        }
      }

      if (cycleLength) {
        const { error: lengthError } = await setInitialCycleLength(cycleLength)
        if (lengthError) {
          errors.cycleLength = lengthError.message
        }
      }

      return { errors: isEmpty(errors) ? null : errors }
    },
    [dispatch, mainMensesTag, setInitialCycleLength]
  )

  return {
    isLoading: isLoadingSettings || isLoadingEntries,
    isCompleted: mainMensesTag && hasInitialCycle && isSubscribed,
    isSubscribed,
    setMensesTag: addMensesTag,
    setInitialCycle: handleSetInitialCycle,
    mainMensesTag,
    hasInitialCycle,
  }
}
