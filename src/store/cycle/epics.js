import { map } from "rxjs/operators"
import { ofType } from "redux-observable"

import analyze from "./analyze"
import slice from "./slice"

const { calculationCompleted } = slice.actions

export const calculateEpic = (action$) =>
  action$.pipe(
    ofType("cycle/calculate"),
    map((action) => {
      const result = analyze({
        entriesByDate: action.payload.entriesByDate,
        menstruationTag: action.payload.menstruationTag,
      })
      return calculationCompleted(result)
    })
  )

export default [calculateEpic]
