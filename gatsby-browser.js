import { withTheme } from "./src/theme"
import { withRoot } from "./src/rootElement"
import { entryIdFromDate, makeDate } from "./src/features/utils/days"

export const wrapPageElement = ({ element }) => {
  return withTheme({ element })
}

export const wrapRootElement = ({ element }) => {
  return withRoot({ element })
}

export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  const regex = /timeline\/?(\d\d\d\d-\d\d-\d\d)?$/
  const results = location.pathname.match(regex)

  if (results) {
    const entryId = entryIdFromDate(makeDate(results[1]))
    return `scrollTo-${entryId}`
  } else {
    return true
  }
}
