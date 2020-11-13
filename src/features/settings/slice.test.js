import { selectMensesTags } from "./slice"

describe("#analyzeEntries", () => {
  test("Split menstruation tag setting", () => {
    const state = {
      databases: {
        settings: {
          items: [{ itemId: "tag", item: "period,test,  menses" }],
        },
      },
    }

    expect(selectMensesTags(state)).toEqual(["period", "test", "menses"])
  })
})
