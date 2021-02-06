import { tagsFromText, textEndsWithTag, cleanTag } from "./tags"

describe("Tag utils", () => {
  describe("#tagsFromText", () => {
    test("find tag inside gibberish", () => {
      const text = "#happy###$$$$$(()--sde@@a#happy-wefjwjfwkefj#happy"
      expect(tagsFromText(text)).toEqual(["happy", "happy", "happy"])
    })

    test("find tags in one line of text", () => {
      const text = "Feeling #exhausted#stupid--&&,#dum and #tired today."
      expect(tagsFromText(text)).toEqual([
        "exhausted",
        "stupid",
        "dum",
        "tired",
      ])
    })

    test("find tags in several line of text", () => {
      const text = `
         Feeling #happy.#funny and #fun today###. \n And some information about
        about today #sunnytimes.
      `
      expect(tagsFromText(text)).toEqual([
        "happy",
        "funny",
        "fun",
        "sunnytimes",
      ])
    })
  })

  describe("#textEndsWithTag", () => {
    test("ends with tag + .", () => {
      const text = "Text that almost ends with #tag."
      expect(textEndsWithTag(text)).toEqual(false)
    })

    test("ends with tag", () => {
      const text = "Text that ends with a #tag"
      expect(textEndsWithTag(text)).toEqual(true)
    })

    test("several lines does not end in tag", () => {
      const text = `
         Text with many #tag #tagagain that \n is also mulitline and does not end with a tag
      `
      expect(textEndsWithTag(text)).toEqual(false)
    })
  })

  describe("#cleanTag", () => {
    test("clean gibberish from tag", () => {
      const tag = "$&#(((#menses#blæ#test"
      expect(cleanTag(tag)).toEqual("menses")
    })

    test("clean # at beginning", () => {
      const tag = "#menses"
      expect(cleanTag(tag)).toEqual("menses")
    })

    test("clean whitespace from tag", () => {
      const tag = "     menses   "
      expect(cleanTag(tag)).toEqual("menses")
    })

    test("do nothing with conforming tag", () => {
      const tag = "menses"
      expect(cleanTag(tag)).toEqual("menses")
    })

    test("no tag in there", () => {
      const tag = "$$$"
      expect(cleanTag(tag)).toEqual("")
    })
  })
})
