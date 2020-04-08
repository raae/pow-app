import { tagsFromText } from "./tags"

describe("#daysBetweenDates", () => {
  test("simple tag", () => {
    expect(tagsFromText("#period")).toEqual(["period"])
    expect(tagsFromText("First day of #MENSEN, crap.")).toEqual(["MENSEN"])
  })

  test("complex tag", () => {
    expect(tagsFromText("#FeelingLikeShit")).toEqual(["FeelingLikeShit"])
    expect(tagsFromText("#FeelingLikeShit today and want to cry.")).toEqual([
      "FeelingLikeShit",
    ])
  })

  test("multiple tags", () => {
    expect(tagsFromText("#FeelingLikeShit #hurts")).toEqual([
      "FeelingLikeShit",
      "hurts",
    ])
    expect(
      tagsFromText("#FeelingLikeShit today and I want to #cry #cry #cry.")
    ).toEqual(["FeelingLikeShit", "cry", "cry", "cry"])

    expect(
      tagsFromText("#FeelingLikeShit today and I want to #cry#cry#cry.")
    ).toEqual(["FeelingLikeShit", "cry", "cry", "cry"])
  })

  test("tags stop at weird chars", () => {
    expect(tagsFromText("#FeelingLike.Shit")).toEqual(["FeelingLike"])
    expect(
      tagsFromText("#Feeling/LikeShit today and want to #cry-baby.")
    ).toEqual(["Feeling", "cry"])
  })
})
