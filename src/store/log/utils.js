import { format } from "date-fns"

export const formatDateToEntryKey = (date) => {
  if (date instanceof Date) {
    return format(date, "yyyy-MM-dd")
  } else {
    return date
  }
}

export const tagsFromNote = (note) => {
  const match = note.match(/#[^\s]+/g)
  if (!match) {
    return []
  } else {
    return note
      .match(/#[^\s#.'!"$%&()*+,\-./:;<=>?@[\]^`{|}~]+/g)
      .map((tag) => tag.replace("#", ""))
  }
}
