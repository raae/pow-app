import { selectSettings } from "./slice"

describe("settings/slice", () => {
  describe("#selectSettings", () => {
    test("Only menses tags", () => {
      const state = {
        settings: {
          entities: {
            mensesTags: {
              key: "mensesTags",
              value: ["period", "menses", "test"],
            },
          },
        },
      }

      expect(selectSettings(state)).toEqual({
        mensesTags: ["period", "menses", "test"],
        mainMensesTag: "period",
        initialCycleLength: undefined,
      })
    })

    test("Only initialCycleLength", () => {
      const state = {
        settings: {
          entities: {
            initialCycleLength: {
              key: "initialCycleLength",
              value: 28,
            },
          },
        },
      }

      expect(selectSettings(state)).toEqual({
        mensesTags: [],
        mainMensesTag: undefined,
        initialCycleLength: 28,
      })
    })
  })
})
