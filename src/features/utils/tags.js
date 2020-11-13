export const tagsFromText = (text = "") => {
  const match = text.match(/#[^\s]+/g)
  if (!match) {
    return []
  } else {
    return text
      .match(/#[^\s#.'!"$%&()*+,\-./:;<=>?@[\]^`{|}~]+/g)
      .map((tag) => tag.replace("#", ""))
      .filter((tag) => !!tag)
  }
}

export const cleanTag = (tag = "") => {
  const tagWithHash = `#${tag.trim()}`
  return tagsFromText(tagWithHash)[0]
}
