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
      nextStartDate: new Date("2019-08-07"),
      daysBetweens: [23, 21, 21],
      daysBetween: 22,
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
})
