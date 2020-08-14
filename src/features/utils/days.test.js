import { daysBetweenDates } from "./days"

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
