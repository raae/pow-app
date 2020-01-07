import {
  selectCurrentCycleStartDate,
  selectAverageCycleLength,
  selectNextStartDate,
  selectCycleDayForDate,
  selectHumanCycleDayForDate,
  selectPredictionsForDate,
} from "./slice"

describe("Cycle/Selectors", () => {
  describe("#selectCurrentCycleStartDate", () => {
    test("return as date", () => {
      expect(
        selectCurrentCycleStartDate.resultFunc({
          currentCycleStartDate: "2019-11-01",
        })
      ).toEqual(new Date("2019-11-01"))

      expect(
        selectCurrentCycleStartDate.resultFunc({
          currentCycleStartDate: "2019-11-10",
        })
      ).not.toEqual("2019-11-10")
    })
  })

  describe("#selectAverageCycleLength", () => {
    test("return as date", () => {
      expect(
        selectAverageCycleLength.resultFunc({
          averageCycleLength: 22,
        })
      ).toEqual(22)
    })
  })

  describe("#selectNextStartDate", () => {
    test("return correct date", () => {
      expect(
        selectNextStartDate.resultFunc(new Date("2019-11-01"), 22)
      ).toEqual(new Date("2019-11-23"))
    })

    test("return undefined if no start date and/or average length", () => {
      expect(selectNextStartDate.resultFunc(null, null)).toEqual(undefined)
      expect(selectNextStartDate.resultFunc(null, 22)).toEqual(undefined)
      expect(
        selectNextStartDate.resultFunc(new Date("2019-11-01"), null)
      ).toEqual(undefined)
    })
  })

  describe("#selectCycleDayForDate", () => {
    test("return correct cycle day", () => {
      expect(
        selectCycleDayForDate.resultFunc(
          new Date("2019-11-01"),
          22,
          new Date("2019-11-01")
        )
      ).toEqual(0)

      expect(
        selectCycleDayForDate.resultFunc(
          new Date("2019-11-01"),
          22,
          new Date("2019-11-5")
        )
      ).toEqual(4)

      expect(
        selectCycleDayForDate.resultFunc(
          new Date("2019-11-01"),
          22,
          new Date("2019-11-23")
        )
      ).toEqual(0)
    })

    test("return undefined if no start date and/or average length", () => {
      expect(selectNextStartDate.resultFunc(null, null)).toEqual(undefined)
      expect(selectNextStartDate.resultFunc(null, 22)).toEqual(undefined)
      expect(
        selectNextStartDate.resultFunc(new Date("2019-11-01"), null)
      ).toEqual(undefined)
    })
  })

  describe("#selectHumanCycleDayForDate", () => {
    test("return correct cycle day", () => {
      expect(
        selectHumanCycleDayForDate.resultFunc(
          new Date("2019-11-01"),
          new Date("2019-11-01")
        )
      ).toEqual(1)
      expect(
        selectHumanCycleDayForDate.resultFunc(
          new Date("2019-11-01"),
          new Date("2019-11-05")
        )
      ).toEqual(5)
    })
  })

  describe("#selectPredictionsForDate", () => {
    test("return predictions for correct day", () => {
      const slice = {
        currentPredictionsByCycleDay: {
          0: ["firstday", "day1"],
          1: ["day2"],
          3: ["dayfour", "4day"],
        },
        futurePredictionsByCycleDay: {
          0: ["firstday", "day1", "future1"],
          1: ["day2", "future2"],
          3: ["dayfour", "4day", "future4"],
        },
      }

      expect(
        selectPredictionsForDate.resultFunc(
          slice,
          new Date("2018-11-01"),
          22,
          new Date("2018-11-01")
        )
      ).toEqual(["firstday", "day1"])

      expect(
        selectPredictionsForDate.resultFunc(
          slice,
          new Date("2018-11-01"),
          22,
          new Date("2018-11-04")
        )
      ).toEqual(["dayfour", "4day"])

      expect(
        selectPredictionsForDate.resultFunc(
          slice,
          new Date("2018-11-01"),
          22,
          new Date("2018-11-24")
        )
      ).toEqual(["day2", "future2"])

      expect(
        selectPredictionsForDate.resultFunc(
          slice,
          new Date("2018-11-01"),
          22,
          new Date("2018-11-23")
        )
      ).toEqual(["firstday", "day1", "future1"])
    })

    test("filter out duplicate tags", () => {
      const slice = {
        currentPredictionsByCycleDay: {
          0: ["firstday", "firstday", "day1"],
          1: ["day2"],
          3: ["dayfour", "4day"],
        },
        futurePredictionsByCycleDay: {
          0: ["firstday", "day1", "future1"],
          1: ["day2", "future2"],
          3: ["dayfour", "dayfour", "4day", "future4"],
        },
      }

      expect(
        selectPredictionsForDate.resultFunc(
          slice,
          new Date("2018-11-01"),
          22,
          new Date("2018-11-01")
        )
      ).toEqual(["firstday", "day1"])

      expect(
        selectPredictionsForDate.resultFunc(
          slice,
          new Date("2018-11-01"),
          22,
          new Date("2018-11-26")
        )
      ).toEqual(["dayfour", "4day", "future4"])
    })
  })
})
