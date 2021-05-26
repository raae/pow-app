import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { isEmpty } from "lodash"

import { selectHasMensesStartDate } from "../cycle"
import { upsertEntry } from "../entries"
import { useSettings } from "../settings"

export const useOnboarding = () => {
  const dispatch = useDispatch()

  const { mainMensesTag, setInitialCycleLength, addMensesTag } = useSettings()
  const hasInitialCycle = useSelector(selectHasMensesStartDate)

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
    [dispatch, mainMensesTag]
  )

  return {
    setMensesTag: addMensesTag,
    setInitialCycle: handleSetInitialCycle,
    mainMensesTag,
    hasInitialCycle,
  }
}
