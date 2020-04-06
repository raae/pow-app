import analyzeEntries from "./analyze"

describe("#analyzeEntries", () => {
  test("no cycle data", () => {
    const entries = {}
    const settings = { tag: "period" }

    const result = {
      startDates: [],
      nextStartDate: undefined,
      tag: "period",
      daysBetweens: [NaN],
      daysBetweenCalculated: false,
      daysBetween: 28,
      tags: {},
    }

    expect(analyzeEntries({ entries, settings })).toEqual(result)
  })

  test("single cycle with gaps between menstruation tags", () => {
    const entries = {
      "2019-08-02": {
        date: "2019-08-02",
        note: "#flo is the shit",
      },
      "2019-08-03": {
        date: "2019-08-03",
        note: "#flo",
      },
      "2019-08-06": {
        date: "2019-08-06",
        note: "#flo",
      },
      "2019-08-08": {
        date: "2019-08-08",
        note: "#happy #happy #hungry",
      },
    }
    const settings = { tag: "flo", daysBetween: 23 }

    const result = {
      startDates: ["2019-08-02"],
      nextStartDate: "2019-08-25",
      tag: "flo",
      daysBetweens: [23],
      daysBetween: 23,
      daysBetweenCalculated: true,
      tags: {
        0: ["flo"],
        1: ["flo"],
        4: ["flo"],
        6: ["happy", "happy", "hungry"],
      },
    }

    expect(analyzeEntries({ entries, settings })).toEqual(result)
  })

  test("simple two cycle starts", () => {
    const entries = {
      "2019-08-02": {
        note: "#menstruation",
      },
      "2019-08-03": {
        note: "#hungry, but ok",
      },
      "2019-08-25": {
        note: "#menstruation",
      },
      "2019-08-26": {
        note: "I am #happy #happy",
      },
    }
    const settings = {
      tag: "menstruation",
    }

    const result = {
      startDates: ["2019-08-02", "2019-08-25"],
      nextStartDate: "2019-09-17",
      tag: "menstruation",
      daysBetweens: [NaN, 23],
      daysBetween: 23,
      daysBetweenCalculated: true,
      tags: {
        0: ["menstruation", "menstruation"],
        1: ["hungry", "happy", "happy"],
      },
    }

    expect(analyzeEntries({ entries, settings })).toEqual(result)
  })

  test("simple three cycles", () => {
    const entries = {
      "2019-06-04": {
        note: "...#period is cool",
      },
      "2019-06-05": {
        note: "#period #hungry",
      },
      "2019-06-08": {
        note: "#period",
      },
      "2019-06-25": {
        note: "#period",
      },
      "2019-06-26": {
        note: "#period #hungry #angry",
      },
      "2019-07-16": {
        note: "...#period...",
      },
    }
    const settings = { tag: "period", daysBetween: 23 }

    const result = {
      startDates: ["2019-06-04", "2019-06-25", "2019-07-16"],
      nextStartDate: "2019-08-06",
      tag: "period",
      daysBetweens: [23, 21, 21],
      daysBetween: 22,
      daysBetweenCalculated: true,
      tags: {
        0: ["period", "period", "period"],
        1: ["period", "hungry", "period", "hungry", "angry"],
        4: ["period"],
      },
    }

    expect(analyzeEntries({ entries, settings })).toEqual(result)
  })

  test("complex cycles", () => {
    const entries = {
      "2019-06-03": {
        note: "#period",
      },
      "2019-06-06": {
        note: "#period",
      },
      // First day
      "2019-06-01": {
        note: "#period #angry",
      },
      "2019-06-14": {
        note: "#exhausted",
      },
      "2019-06-15": {
        note: "#exhausted",
      },
      // First day
      "2019-06-20": {
        note: "#period, #angry",
      },
      "2019-06-21": {
        note: "#period",
      },
      "2019-06-30": {
        note: "#happy",
      },
      // First day
      "2019-07-10": {
        note: "#period #tired",
      },
      "2019-07-01": {
        note: "#hungry",
      },
    }
    const settings = { tag: "period" }

    const result = {
      startDates: ["2019-06-01", "2019-06-20", "2019-07-10"],
      nextStartDate: "2019-07-29",
      tag: "period",
      daysBetweens: [NaN, 19, 20],
      daysBetween: 20,
      daysBetweenCalculated: true,
      tags: {
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
    expect(analyzeEntries({ entries, settings })).toEqual(result)
  })

  test("settings.daysBetween can be a string", () => {
    const entries = {
      "2020-02-15": {
        date: "2020-02-15",
        note: "#period",
      },
      "2020-03-11": {
        date: "2020-03-11",
        note: "#period",
      },
    }
    const settings = { tag: "period", daysBetween: "27" }

    const result = {
      startDates: ["2020-02-15", "2020-03-11"],
      nextStartDate: "2020-04-06",
      tag: "period",
      daysBetweens: [27, 25],
      daysBetween: 26,
      daysBetweenCalculated: true,
      tags: {
        0: ["period", "period"],
      },
    }

    expect(analyzeEntries({ entries, settings })).toEqual(result)
  })
})
