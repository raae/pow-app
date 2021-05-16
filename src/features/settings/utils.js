import { uniq, compact } from "lodash"
import { cleanTag } from "../utils/tags"

export const cleanTags = (tags = []) => {
  const cleanedTags = tags.map((tag) => cleanTag(tag))
  return uniq(compact(cleanedTags))
}

export const textToTagArray = (text = "") => {
  const tags = text.split(",")
  return cleanTags(tags)
}

export const tagArrayToText = (tags = []) => {
  const cleanedTags = cleanTags(tags)
  return cleanedTags.join(",")
}
