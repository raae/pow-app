import { first } from "lodash"

export const tagsFromText = (text = "") => {
  const match = text.match(/#[^\s#.'!"$%&()*+,\-./:;<=>?@[\]^`{|}~]+/g)
  if (!match) {
    return []
  } else {
    return match.map((tag) => tag.replace("#", "")).filter((tag) => !!tag)
  }
}

export const cleanTag = (tag = "") => {
  const tagWithHash = `#${tag.trim()}`
  return first(tagsFromText(tagWithHash)) || ""
}
