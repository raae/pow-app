import { analyzeEntries, daysBetweenDates } from "./utils"

describe("#daysBetweenDates", () => {
  test("date strings", () => {
    expect(daysBetweenDates("2019-01-01", "2019-01-02")).toBe(1)
  })

  test("date and date string", () => {
    expect(daysBetweenDates(new Date("2019-01-04"), "2019-01-02")).toBe(2)
  })

  test("dates", () => {
    expect(
      daysBetweenDates(new Date("2019-01-04"), new Date("2019-01-10"))
    ).toBe(6)
  })
})

describe("#analyzeEntries", () => {
  test("no cycle data", () => {
    const entriesByDate = {}
    const tag = "period"

    const result = {
      startDates: [],
      tags: {},
    }

    expect(analyzeEntries({ entriesByDate, tag })).toEqual(result)
  })

  test("single cycle with gaps between menstruation tags", () => {
    const entriesByDate = {
      "2019-08-02": {
        date: "2019-08-02",
        tags: ["flo"],
      },
      "2019-08-03": {
        date: "2019-08-03",
        tags: ["flo"],
      },
      "2019-08-06": {
        date: "2019-08-06",
        tags: ["flo"],
      },
    }
    const tag = "flo"

    const result = {
      startDates: ["2019-08-02"],
      tags: {},
    }

    expect(analyzeEntries({ entriesByDate, tag })).toEqual(result)
  })

  test("simple two cycle starts", () => {
    const entriesByDate = {
      "2019-08-02": {
        date: "2019-08-02",
        tags: ["menstruation"],
      },
      "2019-08-25": {
        date: "2019-08-25",
        tags: ["menstruation"],
      },
    }
    const tag = "menstruation"

    const result = {
      startDates: ["2019-08-02", "2019-08-25"],
      averageLength: 23,
      tags: {},
    }

    expect(analyzeEntries({ entriesByDate, tag })).toEqual(result)
  })

  test("simple three cycles", () => {
    const entriesByDate = {
      "2019-06-04": {
        date: "2019-06-04",
        tags: ["period"],
      },
      "2019-06-08": {
        date: "2019-06-08",
        tags: ["period"],
      },
      "2019-06-25": {
        date: "2019-06-25",
        tags: ["period"],
      },
      "2019-07-16": {
        date: "2019-07-16",
        tags: ["period"],
      },
    }
    const tag = "period"
    const averageLength = 28

    const result = {
      startDates: ["2019-06-04", "2019-06-25", "2019-07-16"],
      averageLength: 21,
      tags: {},
    }

    expect(analyzeEntries({ entriesByDate, tag })).toEqual(result)
  })

  test("complex cycles", () => {
    const entriesByDate = {
      "2019-06-03": {
        date: "2019-06-03",
        tags: ["period"],
      },
      "2019-06-10": {
        date: "2019-06-06",
        tags: ["period"],
      },
      // First day
      "2019-06-01": {
        date: "2019-06-01",
        tags: ["period", "angry"],
      },
      "2019-06-14": {
        date: "2019-06-14",
        tags: ["exhausted"],
      },
      "2019-06-15": {
        date: "2019-06-15",
        tags: ["exhausted"],
      },
      // First day
      "2019-06-20": {
        date: "2019-06-20",
        tags: ["period"],
      },
      "2019-06-21": {
        date: "2019-06-21",
        tags: ["period"],
      },
      "2019-06-30": {
        date: "2019-06-30",
        tags: ["happy"],
      },
      // First day
      "2019-07-10": {
        date: "2019-07-10",
        tags: ["period", "tired"],
      },
      "2019-07-01": {
        date: "2019-07-01",
        tags: ["hungry"],
      },
    }
    const tag = "period"
    const averageLength = 28

    const result = {
      startDates: ["2019-06-01", "2019-06-20", "2019-07-10"],
      // 19 days, 20 days
      averageLength: 19.5,
      tags: {
        // 0: ["period", "angry", "tired"],
        // 1: ["period"],
        // 2: ["period"],
        // 9: ["period"],
        // 11: ["happy", "hungry"],
        // 13: ["exhausted"],
        // 14: ["exhausted"],
      },
    }
    expect(analyzeEntries({ entriesByDate, tag })).toEqual(result)
  })
})
