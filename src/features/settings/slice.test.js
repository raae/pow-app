import { selectMensesTags } from "./slice"

describe("#analyzeEntries", () => {
  test("Split menstruation tag setting", () => {
    const state = {
      settings: {
        entities: {
          tag: {
            itemId: "tag",
            item: "period,test,  menses",
          },
        },
      },
    }

    expect(selectMensesTags(state)).toEqual(["period", "test", "menses"])
  })
})
