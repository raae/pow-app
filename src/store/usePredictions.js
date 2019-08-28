import { useStore } from "./store"
import { differenceInDays, addDays } from "date-fns"

const usePredictions = () => {
  const [{ predictions }, setState] = useStore()

  const updatePrediction = (key, prediction) => {
    setState((state) => ({
      ...state,
      predictions: {
        ...state.predictions,
        [key]: prediction,
      },
    }))
  }

  const getPrediction = (key) => {
    if (!predictions.hasOwnProperty(key)) {
      console.warn(`No ${key} on settings slice of state`)
    }
    return predictions[key]
  }

  const getCurrentCycleDay = () => {
    const today = Date.now()
    const currentCycleStart = new Date(getPrediction("currentCycleStart"))
    return differenceInDays(today, currentCycleStart)
  }

  const getNextMenstruation = () => {
    const currentCycleStart = new Date(getPrediction("currentCycleStart"))
    const averageCycle = getPrediction("averageCycle")
    const cycleLength = averageCycle
      ? averageCycle
      : getPrediction("defaultCycle")

    return addDays(currentCycleStart, cycleLength)
  }

  return [
    {
      currentCycleDay: getCurrentCycleDay(),
      nextMenstruation: getNextMenstruation(),
    },
    {},
  ]
}

export default usePredictions
