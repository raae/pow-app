import userbase from "userbase-js"
import { selectSettings, setInitialCycleLength } from "./slice"

jest.mock("userbase-js")

describe("settings/slice", () => {
  describe("#setInitialCycleLength", () => {
    let dispatch
    let getState

    beforeEach(() => {
      dispatch = jest.fn()
      getState = jest
        .fn()
        .mockName("getState")
        .mockReturnValue({
          settings: {
            entities: {},
          },
        })
    })

    test("Call updateItem when there is a current value", async () => {
      getState.mockReturnValue({
        settings: {
          entities: {
            initialCycleLength: 30,
          },
        },
      })

      const action = setInitialCycleLength(20)
      userbase.updateItem.mockName("updateItem").mockResolvedValue()

      await action(dispatch, getState, undefined)
      expect(userbase.updateItem).toHaveBeenCalledWith({
        databaseName: "settings",
        itemId: "daysBetween",
        item: 20,
      })
    })

    test("Call insertItem when no current value", async () => {
      const action = setInitialCycleLength("20")
      userbase.insertItem.mockName("insertItem").mockResolvedValue()

      await action(dispatch, getState, undefined)
      expect(userbase.insertItem).toHaveBeenCalledWith({
        databaseName: "settings",
        itemId: "daysBetween",
        item: 20,
      })
    })

    describe("Invalid payload should lead to a rejection", () => {
      test("Too low", async () => {
        const action1 = setInitialCycleLength(100)
        const result1 = await action1(dispatch, getState, undefined)
        expect(result1).toMatchObject({
          type: "setting/upsert/rejected",
        })
      })

      test("Too high", async () => {
        const action2 = setInitialCycleLength(10)
        const result2 = await action2(dispatch, getState, undefined)
        expect(result2).toMatchObject({
          type: "setting/upsert/rejected",
        })
      })
    })
  })

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
