export const tagsFromText = (note = "") => {
  const match = note.match(/#[^\s]+/g)
  if (!match) {
    return []
  } else {
    return note
      .match(/#[^\s#.'!"$%&()*+,\-./:;<=>?@[\]^`{|}~]+/g)
      .map((tag) => tag.replace("#", ""))
  }
}
