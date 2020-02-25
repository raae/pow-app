import { cycleDayForDate } from "./useCycleDayState"

describe("#cycleDayForDate", () => {
  describe("no full cycle", () => {
    const context1 = {
      startDates: ["2020-04-10"],
      daysBetween: 10,
    }

    test("data can be string or date", () => {
      expect(cycleDayForDate("2020-04-11", context1)).toBe(1)
      expect(cycleDayForDate(new Date("2020-04-11"), context1)).toBe(1)
    })

    test("after date", () => {
      expect(cycleDayForDate("2020-04-19", context1)).toBe(9)
      expect(cycleDayForDate("2020-04-20", context1)).toBeCloseTo(0, 0)
      expect(cycleDayForDate("2020-04-25", context1)).toBe(5)
      expect(cycleDayForDate("2020-04-30", context1)).toBeCloseTo(0, 0)
    })

    test("before date", () => {
      expect(cycleDayForDate("2020-04-01", context1)).toBe(1)
      expect(cycleDayForDate("2020-04-30", context1)).toBeCloseTo(0, 0)
      expect(cycleDayForDate("2020-05-25", context1)).toBe(5)
      expect(cycleDayForDate("2020-05-20", context1)).toBeCloseTo(0, 0)
    })
  })

  describe("one full cycles", () => {
    const context1 = {
      startDates: ["2020-04-10", "2020-05-01"],
      daysBetween: 7,
    }

    test("after current", () => {
      expect(cycleDayForDate("2020-05-05", context1)).toBe(4)
      expect(cycleDayForDate("2020-05-08", context1)).toBeCloseTo(0, 0)
      expect(cycleDayForDate("2020-05-13", context1)).toBe(5)
      expect(cycleDayForDate("2020-05-15", context1)).toBeCloseTo(0, 0)
    })

    test("before date last", () => {
      expect(cycleDayForDate("2020-04-01", context1)).toBe(5)
      expect(cycleDayForDate("2020-04-02", context1)).toBe(6)
      expect(cycleDayForDate("2020-04-03", context1)).toBeCloseTo(0, 0)
      expect(cycleDayForDate("2020-04-04", context1)).toBe(1)
      expect(cycleDayForDate("2020-04-05", context1)).toBe(2)
      expect(cycleDayForDate("2020-04-06", context1)).toBe(3)
    })

    test("on start dates", () => {
      expect(cycleDayForDate("2020-04-10", context1)).toBeCloseTo(0, 0)
      expect(cycleDayForDate("2020-05-01", context1)).toBeCloseTo(0, 0)
    })

    test("within cycle", () => {
      expect(cycleDayForDate("2020-04-11", context1)).toBeCloseTo(1)
      expect(cycleDayForDate("2020-04-20", context1)).toBeCloseTo(10)
    })
  })

  describe("several full cycles", () => {
    const context1 = {
      startDates: ["2020-04-10", "2020-05-01", "2020-05-23"],
      daysBetween: 7,
    }

    test("after current", () => {
      expect(cycleDayForDate("2020-05-25", context1)).toBe(2)
      expect(cycleDayForDate("2020-05-30", context1)).toBeCloseTo(0, 0)
      expect(cycleDayForDate("2020-06-01", context1)).toBe(2)
    })

    test("before date last", () => {
      expect(cycleDayForDate("2020-04-01", context1)).toBe(5)
      expect(cycleDayForDate("2020-04-02", context1)).toBe(6)
      expect(cycleDayForDate("2020-04-03", context1)).toBeCloseTo(0, 0)
      expect(cycleDayForDate("2020-04-04", context1)).toBe(1)
      expect(cycleDayForDate("2020-04-05", context1)).toBe(2)
      expect(cycleDayForDate("2020-04-06", context1)).toBe(3)
    })

    test("on start dates", () => {
      expect(cycleDayForDate("2020-04-10", context1)).toBeCloseTo(0, 0)
      expect(cycleDayForDate("2020-05-01", context1)).toBeCloseTo(0, 0)
      expect(cycleDayForDate("2020-05-23", context1)).toBeCloseTo(0, 0)
    })

    test("within cycle", () => {
      expect(cycleDayForDate("2020-04-11", context1)).toBeCloseTo(1)
      expect(cycleDayForDate("2020-04-20", context1)).toBeCloseTo(10)
      expect(cycleDayForDate("2020-05-04", context1)).toBeCloseTo(3)
      expect(cycleDayForDate("2020-05-08", context1)).toBeCloseTo(7)
      expect(cycleDayForDate("2020-05-12", context1)).toBeCloseTo(11)
    })
  })
})
