import analyzeEntries, { daysBetweenDates } from "./analyze"

describe("#daysBetweenDates", () => {
  test("date strings", () => {
    expect(daysBetweenDates("2019-01-01", "2019-01-02")).toBe(-1)
  })

  test("date and date string", () => {
    expect(daysBetweenDates(new Date("2019-01-04"), "2019-01-02")).toBe(2)
  })

  test("dates", () => {
    expect(
      daysBetweenDates(new Date("2019-01-04"), new Date("2019-01-10"))
    ).toBe(-6)
  })
})

describe("#analyzeEntries", () => {
  test("no cycle data", () => {
    const entriesByDate = {}
    const menstruationTag = "period"

    const result = {
      currentCycleStartDate: undefined,
      tagsForCurrentCycle: {},
      tagsForFutureCycles: {},
    }

    expect(analyzeEntries({ entriesByDate, menstruationTag })).toEqual(result)
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
      "2019-08-08": {
        date: "2019-08-08",
        tags: ["happy", "hungry"],
      },
    }
    const menstruationTag = "flo"

    const result = {
      currentCycleStartDate: "2019-08-02",
      tagsForCurrentCycle: {},
      tagsForFutureCycles: {
        0: ["flo"],
        1: ["flo"],
        4: ["flo"],
        6: ["happy", "hungry"],
      },
    }

    expect(analyzeEntries({ entriesByDate, menstruationTag })).toEqual(result)
  })

  test("simple two cycle starts", () => {
    const entriesByDate = {
      "2019-08-02": {
        date: "2019-08-02",
        tags: ["menstruation"],
      },
      "2019-08-03": {
        date: "2019-08-03",
        tags: ["hungry"],
      },
      "2019-08-25": {
        date: "2019-08-25",
        tags: ["menstruation"],
      },
      "2019-08-26": {
        date: "2019-08-26",
        tags: ["happy"],
      },
    }
    const menstruationTag = "menstruation"

    const result = {
      currentCycleStartDate: "2019-08-25",
      averageCycleLength: 23,
      tagsForCurrentCycle: {
        0: ["menstruation"],
        1: ["hungry"],
      },
      tagsForFutureCycles: {
        0: ["menstruation", "menstruation"],
        1: ["hungry", "happy"],
      },
    }

    expect(analyzeEntries({ entriesByDate, menstruationTag })).toEqual(result)
  })

  test("simple three cycles", () => {
    const entriesByDate = {
      "2019-06-04": {
        date: "2019-06-04",
        tags: ["period"],
      },
      "2019-06-05": {
        date: "2019-06-05",
        tags: ["period", "hungry"],
      },
      "2019-06-08": {
        date: "2019-06-08",
        tags: ["period"],
      },
      "2019-06-25": {
        date: "2019-06-25",
        tags: ["period"],
      },
      "2019-06-26": {
        date: "2019-06-26",
        tags: ["period", "hungry", "angry"],
      },
      "2019-07-16": {
        date: "2019-07-16",
        tags: ["period"],
      },
    }
    const menstruationTag = "period"

    const result = {
      currentCycleStartDate: "2019-07-16",
      averageCycleLength: 21,
      tagsForCurrentCycle: {
        0: ["period", "period"],
        1: ["period", "hungry", "period", "hungry", "angry"],
        4: ["period"],
      },
      tagsForFutureCycles: {
        0: ["period", "period", "period"],
        1: ["period", "hungry", "period", "hungry", "angry"],
        4: ["period"],
      },
    }

    expect(analyzeEntries({ entriesByDate, menstruationTag })).toEqual(result)
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
        tags: ["period", "angry"],
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
    const menstruationTag = "period"

    const result = {
      currentCycleStartDate: "2019-07-10",
      // 19 days, 20 days
      averageCycleLength: 19.5,
      tagsForCurrentCycle: {
        0: ["period", "angry", "period", "angry"],
        1: ["period"],
        2: ["period"],
        5: ["period"],
        10: ["happy"],
        11: ["hungry"],
        13: ["exhausted"],
        14: ["exhausted"],
      },
      tagsForFutureCycles: {
        0: ["period", "angry", "period", "angry", "period", "tired"],
        1: ["period"],
        2: ["period"],
        5: ["period"],
        10: ["happy"],
        11: ["hungry"],
        13: ["exhausted"],
        14: ["exhausted"],
      },
    }
    expect(analyzeEntries({ entriesByDate, menstruationTag })).toEqual(result)
  })
})
