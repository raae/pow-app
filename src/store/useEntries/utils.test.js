import { tagsFromNote } from "./utils"

describe("#tagsFromNote", () => {
  test("simple tags with space between", () => {
    const text = "#period #hungry #angry"
    const result = ["period", "hungry", "angry"]
    expect(tagsFromNote(text)).toEqual(result)
  })

  test("simple tags with comma between", () => {
    const text = "#period,#hungry, #angry"
    const result = ["period", "hungry", "angry"]
    expect(tagsFromNote(text)).toEqual(result)
  })

  test("tags in text with punctuation", () => {
    const text = "Feeling #hungry, and #happy. And #angry!"
    const result = ["hungry", "happy", "angry"]
    expect(tagsFromNote(text)).toEqual(result)
  })

  test("weird punctuation 1", () => {
    const text = "Feeling #hungry^test, and #happy/#angry."
    const result = ["hungry", "happy", "angry"]
    expect(tagsFromNote(text)).toEqual(result)
  })

  test("weird punctuation 2", () => {
    const text = "Feeling #hungry_test, and #happy=#angry."
    const result = ["hungry_test", "happy", "angry"]
    expect(tagsFromNote(text)).toEqual(result)
  })
})
