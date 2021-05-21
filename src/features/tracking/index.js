import { ENV } from "../../constants"

export const trackGoal = (goalId) => {
  try {
    window.fathom.trackGoal(goalId, 0)
    if (ENV !== "production") {
      console.log("Track fathom goal", goalId)
    }
  } catch (error) {
    console.warn("No fathom, cannot track goal", goalId)
  }
}
