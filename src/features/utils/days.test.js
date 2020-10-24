import { daysBetweenDates, makeDate } from "./days"
import { startOfDay } from "date-fns"

describe("#makeDate", () => {
  const testString = "2019-01-04"
  const testDate = new Date(testString)
  const resultDate = startOfDay(testDate)

  test("Transform dates to start of date", () => {
    expect(makeDate(testDate)).toStrictEqual(resultDate)
  })

  test("Transform strings to corresponding start of date", () => {
    expect(makeDate(testString)).toStrictEqual(resultDate)
  })
})

describe("#daysBetweenDates", () => {
  test("date strings", () => {
    expect(
      daysBetweenDates(makeDate("2019-01-01"), makeDate("2019-01-02"))
    ).toBe(-1)
  })

  test("date and date string", () => {
    expect(
      daysBetweenDates(makeDate("2019-01-04"), makeDate("2019-01-02"))
    ).toBe(2)
  })

  test("dates", () => {
    expect(
      daysBetweenDates(makeDate("2019-01-04"), makeDate("2019-01-10"))
    ).toBe(-6)
  })
})
