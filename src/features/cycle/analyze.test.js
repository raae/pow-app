import analyzeEntries from "./analyze"

describe("#analyzeEntries", () => {
  test("no cycle data", () => {
    const sortedEntries = []
    const initialDaysBetween = undefined
    const menstruationTags = ["period", "test"]

    const result = {
      startDates: [],
      nextStartDate: undefined,
      daysBetweens: [undefined],
      isDaysBetweenCalculated: false,
      daysBetween: 28,
      tags: {},
    }

    expect(
      analyzeEntries({ sortedEntries, initialDaysBetween, menstruationTags })
    ).toEqual(result)
  })

  test("single cycle with gaps between menstruation tags", () => {
    const sortedEntries = [
      {
        date: new Date("2019-08-02"),
        tags: ["flo"],
        isMenses: true,
      },
      {
        date: new Date("2019-08-03"),
        tags: ["flo"],
        isMenses: true,
      },
      {
        date: new Date("2019-08-06"),
        tags: ["flo"],
        isMenses: true,
      },
      {
        date: new Date("2019-08-08"),
        tags: ["happy", "hungry"],
      },
    ]
    const initialDaysBetween = 23

    const result = {
      startDates: [new Date("2019-08-02")],
      nextStartDate: new Date("2019-08-25"),
      daysBetweens: [23],
      daysBetween: 23,
      isDaysBetweenCalculated: true,
      tags: {
        0: ["flo"],
        1: ["flo"],
        4: ["flo"],
        6: ["happy", "hungry"],
      },
    }

    expect(analyzeEntries({ sortedEntries, initialDaysBetween })).toEqual(
      result
    )
  })

  test("simple two cycle starts", () => {
    const sortedEntries = [
      {
        date: new Date("2019-08-02"),
        tags: ["menstruation"],
        isMenses: true,
      },
      {
        date: new Date("2019-08-03"),
        tags: ["hungry", "happy"],
        isMenses: false,
      },
      {
        date: new Date("2019-08-25"),
        tags: ["period"],
        isMenses: true,
      },
      {
        date: new Date("2019-08-26"),
        tags: ["happy"],
        isMenses: false,
      },
    ]
    const initialDaysBetween = undefined

    const result = {
      startDates: [new Date("2019-08-02"), new Date("2019-08-25")],
      nextStartDate: new Date("2019-09-17"),
      daysBetweens: [undefined, 23],
      daysBetween: 23,
      isDaysBetweenCalculated: true,
      tags: {
        0: ["menstruation", "period"],
        1: ["hungry", "happy", "happy"],
      },
    }

    expect(analyzeEntries({ sortedEntries, initialDaysBetween })).toEqual(
      result
    )
  })

  test("simple three cycles", () => {
    const sortedEntries = [
      {
        date: new Date("2019-06-04"),
        tags: ["period"],
        isMenses: true,
      },
      {
        date: new Date("2019-06-05"),
        tags: ["period", "hungry"],
        isMenses: true,
      },
      {
        date: new Date("2019-06-08"),
        tags: ["period"],
        isMenses: true,
      },
      {
        date: new Date("2019-06-25"),
        tags: ["period"],
        isMenses: true,
      },
      {
        date: new Date("2019-06-26"),
        tags: ["period", "hungry", "angry"],
        isMenses: true,
      },
      {
        date: new Date("2019-07-16"),
        tags: ["period"],
        isMenses: true,
      },
    ]
    const initialDaysBetween = 23

    const result = {
      startDates: [
        new Date("2019-06-04"),
        new Date("2019-06-25"),
        new Date("2019-07-16"),
      ],
      nextStartDate: new Date("2019-08-06"),
      daysBetweens: [23, 21, 21],
      daysBetween: 21,
      isDaysBetweenCalculated: true,
      tags: {
        0: ["period", "period", "period"],
        1: ["period", "hungry", "period", "hungry", "angry"],
        4: ["period"],
      },
    }

    expect(analyzeEntries({ sortedEntries, initialDaysBetween })).toEqual(
      result
    )
  })

  test("complex cycles", () => {
    const sortedEntries = [
      // First day
      {
        date: new Date("2019-06-01"),
        tags: ["period", "angry"],
        isMenses: true,
      },
      {
        date: new Date("2019-06-03"),
        tags: ["period"],
        isMenses: true,
      },
      {
        date: new Date("2019-06-06"),
        tags: ["period"],
        isMenses: true,
      },
      {
        date: new Date("2019-06-14"),
        tags: ["exhausted"],
        isMenses: false,
      },
      {
        date: new Date("2019-06-15"),
        tags: ["exhausted"],
        isMenses: false,
      },
      // First day
      {
        date: new Date("2019-06-20"),
        tags: ["period", "angry"],
        isMenses: true,
      },
      {
        date: new Date("2019-06-21"),
        tags: ["period"],
        isMenses: true,
      },
      {
        date: new Date("2019-06-30"),
        tags: ["happy"],
        isMenses: false,
      },
      {
        date: new Date("2019-07-01"),
        tags: ["hungry"],
        isMenses: false,
      },
      // First day
      {
        date: new Date("2019-07-10"),
        tags: ["period", "tired"],
        isMenses: true,
      },
    ]
    const initialDaysBetween = undefined

    const result = {
      startDates: [
        new Date("2019-06-01"),
        new Date("2019-06-20"),
        new Date("2019-07-10"),
      ],
      nextStartDate: new Date("2019-07-30"),
      daysBetweens: [undefined, 19, 20],
      daysBetween: 20,
      isDaysBetweenCalculated: true,
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
    expect(analyzeEntries({ sortedEntries, initialDaysBetween })).toEqual(
      result
    )
  })

  test("one long gap (e.g. postpartum) does not skew the prediction", () => {
    // A ~9 month gap between periods, followed by regular 28-day cycles
    const sortedEntries = [
      { date: new Date("2020-01-01"), tags: ["period"], isMenses: true },
      { date: new Date("2020-10-07"), tags: ["period"], isMenses: true },
      { date: new Date("2020-11-04"), tags: ["period"], isMenses: true },
      { date: new Date("2020-12-02"), tags: ["period"], isMenses: true },
      { date: new Date("2020-12-30"), tags: ["period"], isMenses: true },
      { date: new Date("2021-01-27"), tags: ["period"], isMenses: true },
    ]
    const initialDaysBetween = undefined

    const analytics = analyzeEntries({ sortedEntries, initialDaysBetween })

    expect(analytics.daysBetweens).toEqual([undefined, 280, 28, 28, 28, 28])
    expect(analytics.daysBetween).toEqual(28)
    expect(analytics.nextStartDate).toEqual(new Date("2021-02-24"))
  })

  test("older cycles age out of the prediction", () => {
    // Two 40-day cycles followed by six 26-day cycles;
    // only the six most recent cycles count
    const sortedEntries = [
      { date: new Date("2020-01-01"), tags: ["period"], isMenses: true },
      { date: new Date("2020-02-10"), tags: ["period"], isMenses: true },
      { date: new Date("2020-03-21"), tags: ["period"], isMenses: true },
      { date: new Date("2020-04-16"), tags: ["period"], isMenses: true },
      { date: new Date("2020-05-12"), tags: ["period"], isMenses: true },
      { date: new Date("2020-06-07"), tags: ["period"], isMenses: true },
      { date: new Date("2020-07-03"), tags: ["period"], isMenses: true },
      { date: new Date("2020-07-29"), tags: ["period"], isMenses: true },
      { date: new Date("2020-08-24"), tags: ["period"], isMenses: true },
    ]
    const initialDaysBetween = undefined

    const analytics = analyzeEntries({ sortedEntries, initialDaysBetween })

    expect(analytics.daysBetweens).toEqual([
      undefined,
      40,
      40,
      26,
      26,
      26,
      26,
      26,
      26,
    ])
    expect(analytics.daysBetween).toEqual(26)
  })

  test("irregular cycles average out, dropping the extremes", () => {
    // Gaps of 25, 24, 38, 26, 27 and 60 days; the shortest (24) and
    // longest (60) are dropped and the rest averaged: 29
    const sortedEntries = [
      { date: new Date("2020-01-01"), tags: ["period"], isMenses: true },
      { date: new Date("2020-01-26"), tags: ["period"], isMenses: true },
      { date: new Date("2020-02-19"), tags: ["period"], isMenses: true },
      { date: new Date("2020-03-28"), tags: ["period"], isMenses: true },
      { date: new Date("2020-04-23"), tags: ["period"], isMenses: true },
      { date: new Date("2020-05-20"), tags: ["period"], isMenses: true },
      { date: new Date("2020-07-19"), tags: ["period"], isMenses: true },
    ]
    const initialDaysBetween = undefined

    const analytics = analyzeEntries({ sortedEntries, initialDaysBetween })

    expect(analytics.daysBetweens).toEqual([undefined, 25, 24, 38, 26, 27, 60])
    expect(analytics.daysBetween).toEqual(29)
    expect(analytics.nextStartDate).toEqual(new Date("2020-08-17"))
  })
})
